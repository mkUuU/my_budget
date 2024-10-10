import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import GroupSavings from './components/GroupSavings';
import GroupPage from './components/GroupPage';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/group-savings" element={<GroupSavings />} />
        <Route path="/group/:id" element={<GroupPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Layout>
  );
}

export default App;