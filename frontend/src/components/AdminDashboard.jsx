import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faMoneyBillWave, faShoppingCart, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

      setUsers(storedUsers);


      // Generate mock activity data
      const mockActivityData = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return {
          date: date.toLocaleDateString(),
          transactions: Math.floor(Math.random() * 100),
          newUsers: Math.floor(Math.random() * 10),
        };
      }).reverse();
      setActivityData(mockActivityData);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Check for updates every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>
              <FontAwesomeIcon icon={faUsers} className="mr-2" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{users.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2" />
              Total Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">Ksh 10,000</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
              Total Spending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">Ksh 5,000</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <FontAwesomeIcon icon={faHandHoldingUsd} className="mr-2" />
              Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">Ksh 15,000</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Activity Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="transactions" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line yAxisId="right" type="monotone" dataKey="newUsers" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent User Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-2">User</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Joined</th>
                  <th className="text-left p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{new Date(user.joinedAt).toLocaleDateString()}</td>
                    <td className="p-2">Registered</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;