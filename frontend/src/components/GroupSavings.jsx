import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const GroupSavings = () => {
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupAmount, setNewGroupAmount] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem('groups') || '[]');
    setGroups(storedGroups);
  }, []);

  const createGroup = () => {
    if (newGroupName && newGroupAmount) {
      const newGroup = {
        id: Date.now(),
        name: newGroupName,
        creator: user.name,
        members: [user.name],
        totalAmountNeeded: parseFloat(newGroupAmount),
        values: []
      };
      const updatedGroups = [...groups, newGroup];
      setGroups(updatedGroups);
      localStorage.setItem('groups', JSON.stringify(updatedGroups));
      setNewGroupName('');
      setNewGroupAmount('');
    }
  };

  const viewGroup = (groupId) => {
    navigate(`/group/${groupId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create New Group</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="groupName">Group Name</Label>
              <Input
                id="groupName"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Enter group name"
              />
            </div>
            <div>
              <Label htmlFor="groupAmount">Total Amount Needed</Label>
              <Input
                id="groupAmount"
                type="number"
                value={newGroupAmount}
                onChange={(e) => setNewGroupAmount(e.target.value)}
                placeholder="Enter total amount needed"
              />
            </div>
            <Button onClick={createGroup}>Create Group</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Groups</CardTitle>
        </CardHeader>
        <CardContent>
          {groups.length === 0 ? (
            <p>You havent created or joined any groups yet.</p>
          ) : (
            <div className="space-y-4">
              {groups.map((group) => (
                <Card key={group.id}>
                  <CardContent className="flex justify-between items-center p-4">
                    <div>
                      <h3 className="font-bold">{group.name}</h3>
                      <p>Created by: {group.creator}</p>
                      <p>Members: {group.members.length}</p>
                      <p>Total Amount Needed: Ksh{group.totalAmountNeeded}</p>
                    </div>
                    <Button onClick={() => viewGroup(group.id)}>View Group</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupSavings;