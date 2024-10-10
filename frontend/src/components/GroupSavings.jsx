import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const GroupSavings = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState([
    { id: 1, name: 'Family Savings', members: ['John', 'Jane', 'Bob'], creator: 'John' },
    { id: 2, name: 'Friends Trip', members: ['Alice', 'Charlie', 'David'], creator: 'Alice' },
  ]);
  const [newGroupName, setNewGroupName] = useState('');

  const createGroup = () => {
    if (newGroupName.trim()) {
      const newGroup = {
        id: groups.length + 1,
        name: newGroupName.trim(),
        members: [user.name],
        creator: user.name
      };
      setGroups([...groups, newGroup]);
      setNewGroupName('');
    }
  };

  const deleteGroup = (groupId) => {
    setGroups(groups.filter(group => group.id !== groupId));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Group Savings</h1>
      <div className="mb-4 flex">
        <Input
          type="text"
          placeholder="New group name"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          className="mr-2"
        />
        <Button onClick={createGroup}>
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Create Group
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <CardTitle>{group.name}</CardTitle>
              <CardDescription>Created by: {group.creator}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-2">
                {group.members.map((member, index) => (
                  <div key={index} className="flex items-center">
                    <img
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${member}`}
                      alt={member}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span>{member}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <Button variant="outline" asChild>
                  <a href={`/group/${group.id}`}>
                    <FontAwesomeIcon icon={faUsers} className="mr-2" />
                    View Group
                  </a>
                </Button>
                {(user.isAdmin || user.name === group.creator) && (
                  <Button variant="destructive" onClick={() => deleteGroup(group.id)}>
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Delete Group
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GroupSavings;