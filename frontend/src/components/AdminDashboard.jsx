import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faDollarSign, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      // In a real application, you would fetch this data from your backend
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const storedGroups = JSON.parse(localStorage.getItem('groups') || '[]');
      const loggedInUser = JSON.parse(localStorage.getItem('user'));
      
      if (loggedInUser && !storedUsers.some(u => u.email === loggedInUser.email)) {
        storedUsers.push(loggedInUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));
      }

      setUsers(storedUsers);
      setGroups(storedGroups);

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
    const interval = setInterval(fetchData, 3000); // Check for updates every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
              <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
              Total Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold"> Ksh 10,000</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <FontAwesomeIcon icon={faChartLine} className="mr-2" />
              Active Groups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{groups.length}</p>
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
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{new Date(user.joinedAt || Date.now()).toLocaleDateString()}</td>
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