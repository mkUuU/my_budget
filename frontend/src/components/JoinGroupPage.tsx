import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const JoinGroupPage: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();  // Type for the groupId param
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const joinGroup = () => {
      const storedGroups = JSON.parse(localStorage.getItem('groups') || '[]');
      const group = storedGroups.find((g: { id: string; members: string[] }) => g.id.toString() === groupId);

      if (group && user && !group.members.includes(user.name)) {
        group.members.push(user.name);
        const updatedGroups = storedGroups.map((g: { id: string }) => (g.id.toString() === groupId ? group : g));
        localStorage.setItem('groups', JSON.stringify(updatedGroups));
      }
    };

    if (user) {
      joinGroup();
      navigate(`/group/${groupId}`);
    } else {
      navigate('/login');
    }
  }, [groupId, user, navigate]);

  return <div>Joining group...</div>;
};

export default JoinGroupPage;
