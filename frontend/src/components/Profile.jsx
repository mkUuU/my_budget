import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    monthlyIncome: '',
    monthlySavingsGoal: ''
  });

  useEffect(() => {
    if (user) {
      // Fetch user profile
      // This is a placeholder. In a real app, you'd fetch this from your backend
      setProfile({
        name: user.name,
        email: user.email,
        monthlyIncome: '35000',
        monthlySavingsGoal: '10000'
      });
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profile);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Profile update failed:', error);
      // Handle profile update error
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Manage your account settings</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
              <Input
                type="text"
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
              <Input
                type="email"
                id="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="monthlyIncome" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Monthly Income (KSH)</label>
              <Input
                type="number"
                id="monthlyIncome"
                value={profile.monthlyIncome}
                onChange={(e) => setProfile({ ...profile, monthlyIncome: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="monthlySavingsGoal" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Monthly Savings Goal (KSH)</label>
              <Input
                type="number"
                id="monthlySavingsGoal"
                value={profile.monthlySavingsGoal}
                onChange={(e) => setProfile({ ...profile, monthlySavingsGoal: e.target.value })}
                required
              />
            </div>
            <Button type="submit">Update Profile</Button>
          </form>
          <Button variant="outline" onClick={handleLogout} className="mt-4">Logout</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;