import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

const GroupPage = () => {
  const { id } = useParams();
  // In a real application, you would fetch the group data based on the id
  const group = {
    id: id,
    name: 'Sample Group',
    members: ['John', 'Jane', 'Bob'],
    creator: 'John',
    balance: 1000
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{group.name}</CardTitle>
          <CardDescription>Created by: {group.creator}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Group Balance: Ksh {group.balance}</p>
          <h3 className="font-bold mb-2">Members:</h3>
          <div className="flex flex-wrap gap-2">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupPage;