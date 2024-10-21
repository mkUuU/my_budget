import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Edit2, Trash2, AlertTriangle, Link } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function GroupPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [newMember, setNewMember] = useState('');
  const [newValue, setNewValue] = useState('');
  const [totalAmountNeeded, setTotalAmountNeeded] = useState(0);
  const [editingContribution, setEditingContribution] = useState(null);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [inviteLink, setInviteLink] = useState('');

  useEffect(() => {
    const fetchGroup = () => {
      const storedGroups = JSON.parse(localStorage.getItem('groups') || '[]');
      const foundGroup = storedGroups.find(g => g.id.toString() === id);
      setGroup(foundGroup || null);
      setTotalAmountNeeded(foundGroup?.totalAmountNeeded || 0);
    };

    fetchGroup();
  }, [id]);

  const updateGroup = (updatedGroup) => {
    const storedGroups = JSON.parse(localStorage.getItem('groups') || '[]');
    const updatedGroups = storedGroups.map(g => g.id.toString() === id ? updatedGroup : g);
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
    setGroup(updatedGroup);
  };

  const generateInviteLink = () => {
    const link = `${window.location.origin}/join-group/${group.id}`;
    setInviteLink(link);
  };

  const addMember = () => {
    if (newMember && !group.members.includes(newMember)) {
      const updatedGroup = {
        ...group,
        members: [...group.members, newMember]
      };
      updateGroup(updatedGroup);
      setNewMember('');
    }
  };

  const addValue = () => {
    if (newValue) {
      const updatedGroup = {
        ...group,
        values: [...(group.values || []), { user: user.name, value: parseFloat(newValue) }]
      };
      updateGroup(updatedGroup);
      setNewValue('');
    }
  };

  const editContribution = (index, newValue) => {
    const updatedValues = [...group.values];
    updatedValues[index].value = parseFloat(newValue);
    const updatedGroup = { ...group, values: updatedValues };
    updateGroup(updatedGroup);
    setEditingContribution(null);
  };

  const deleteContribution = (index) => {
    const updatedValues = group.values.filter((_, i) => i !== index);
    const updatedGroup = { ...group, values: updatedValues };
    updateGroup(updatedGroup);
  };

  const deleteGroup = () => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      const storedGroups = JSON.parse(localStorage.getItem('groups') || '[]');
      const updatedGroups = storedGroups.filter(g => g.id.toString() !== id);
      localStorage.setItem('groups', JSON.stringify(updatedGroups));
      navigate('/group-savings');
    }
  };

  const reportGroup = () => {
    const reports = JSON.parse(localStorage.getItem('groupReports') || '[]');
    reports.push({
      groupId: id,
      groupName: group.name,
      reportedBy: user.name,
      reason: reportReason,
      date: new Date().toISOString()
    });
    localStorage.setItem('groupReports', JSON.stringify(reports));
    setIsReportDialogOpen(false);
    setReportReason('');
    alert('Group reported successfully');
  };

  const canDeleteGroup = user.isAdmin || group?.creator === user.name;

  const totalContributed = group?.values?.reduce((sum, contribution) => sum + contribution.value, 0) || 0;
  const remainingAmount = Math.max(totalAmountNeeded - totalContributed, 0);
  const progressPercentage = (totalContributed / totalAmountNeeded) * 100;

  if (!group) {
    return <div className="container mx-auto p-4">Group not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{group.name}</span>
            <div>
              {canDeleteGroup && (
                <Button variant="destructive" onClick={deleteGroup} className="mr-2">
                  Delete Group
                </Button>
              )}
              <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Report Group
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Report Group</DialogTitle>
                    <DialogDescription>
                      Please provide a reason for reporting this group.
                    </DialogDescription>
                  </DialogHeader>
                  <Textarea
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    placeholder="Enter reason for reporting..."
                  />
                  <DialogFooter>
                    <Button onClick={reportGroup}>Submit Report</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="totalAmountNeeded">Total Amount Needed</Label>
            <div className="flex mt-1">
              <Input
                id="totalAmountNeeded"
                type="number"
                value={totalAmountNeeded}
                onChange={(e) => setTotalAmountNeeded(parseFloat(e.target.value))}
                className="mr-2"
              />
              <Button onClick={() => updateGroup({ ...group, totalAmountNeeded })}>Update</Button>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-bold mb-2">Progress</h3>
            <Progress value={progressPercentage} className="mb-2" />
            <p>Total Contributed: Ksh {totalContributed.toFixed(2)}</p>
            <p>Remaining Amount: Ksh {remainingAmount.toFixed(2)}</p>
          </div>

          <h3 className="font-bold mb-2">Members:</h3>
          <div className="flex flex-wrap gap-2 mb-4">
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

          <div className="mb-4">
            <Label htmlFor="newMember">Add Member</Label>
            <div className="flex mt-1">
              <Input
                id="newMember"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                placeholder="Enter member name"
                className="mr-2"
              />
              <Button onClick={addMember}>Add</Button>
            </div>
          </div>

          <h3 className="font-bold mb-2">Contributions:</h3>
          <ul className="mb-4">
            {group.values && group.values.map((value, index) => (
              <li key={index} className="flex items-center justify-between mb-2">
                {editingContribution === index ? (
                  <div className="flex items-center">
                    <Input
                      type="number"
                      value={value.value}
                      onChange={(e) => editContribution(index, e.target.value)}
                      className="mr-2"
                    />
                    <Button onClick={() => setEditingContribution(null)}>Save</Button>
                  </div>
                ) : (
                  <>
                    <span>{value.user}: Ksh {value.value}</span>
                    <div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingContribution(index)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteContribution(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>

          <div className="mb-4">
            <Label htmlFor="newValue">Add Contribution</Label>
            <div className="flex mt-1">
              <Input
                id="newValue"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="Enter contribution value"
                className="mr-2"
              />
              <Button onClick={addValue}>Add</Button>
            </div>
          </div>

          <div className="mt-6">
            <Button onClick={generateInviteLink} variant="outline">
              <Link className="mr-2 h-4 w-4" />
              Generate Invite Link
            </Button>
            {inviteLink && (
              <div className="mt-2">
                <Label>Invite Link:</Label>
                <Input value={inviteLink} readOnly />
                <Button onClick={() => navigator.clipboard.writeText(inviteLink)}>
                  Copy to Clipboard
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}