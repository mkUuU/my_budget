import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faDollarSign, faChartLine, faBell, faTrash } from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      try {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const storedGroups = JSON.parse(localStorage.getItem('groups') || '[]');
        const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
        const loggedInUser = JSON.parse(localStorage.getItem('user'));

        if (loggedInUser && !storedUsers.some(u => u.email === loggedInUser.email)) {
          storedUsers.push(loggedInUser);
          localStorage.setItem('users', JSON.stringify(storedUsers));
        }

        setUsers(storedUsers);
        setGroups(storedGroups);
        setNotifications(storedNotifications);

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
      } catch (error) {
        console.error('Error fetching data from localStorage:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000); // Check for updates every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const calculateTotalSavings = () => {
    return groups.reduce((total, group) => total + (group.totalSavings || 0), 0);
  };

  const deleteGroup = (groupIndex) => {
    const updatedGroups = groups.filter((_, index) => index !== groupIndex);
    setGroups(updatedGroups);
    localStorage.setItem('groups', JSON.stringify(updatedGroups));

    const newNotification = {
      message: `Group deleted at ${new Date().toLocaleString()}`,
    };
    const updatedNotifications = [...notifications, newNotification];
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

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
            <p className="text-4xl font-bold">Ksh {calculateTotalSavings()}</p>
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

      {/* Group Management Section */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Manage Groups</CardTitle>
        </CardHeader>
        <CardContent>
          {groups.length === 0 ? (
            <p>No groups available.</p>
          ) : (
            <div className="space-y-4">
              {groups.map((group, index) => (
                <Card key={index}>
                  <CardContent className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{group.name}</h3>
                      <p>Total Savings: {group.totalSavings}</p>
                    </div>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => deleteGroup(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} className="mr-2" />
                      Delete Group
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Group Activity Chart */}
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

      {/* Notifications Section */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>
            <FontAwesomeIcon icon={faBell} className="mr-2" />
            Group Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <p>No notifications at the moment.</p>
          ) : (
            <ul className="list-disc pl-4">
              {notifications.map((notification, index) => (
                <li key={index}>{notification.message}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
