import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faChartLine, faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { Download } from "lucide-react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [savings, setSavings] = useState(0);  // New state for savings
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({ type: 'income', amount: '', description: '' });
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Replace with real API call for fetching financial data
    const fetchData = async () => {
      try {
        const response = await fetch('/api/financial-data'); // Example API endpoint
        const data = await response.json();
        setBalance(data.balance);
        setIncome(data.income);
        setExpense(data.expense);
        setSavings(data.savings);  // Set savings value from API
        setTransactions(data.transactions);
      } catch (error) {
        console.error('Failed to fetch financial data', error);
      }
    };
    fetchData();

    // Update the current time every second
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNewTransaction = (e) => {
    e.preventDefault();
    const transaction = {
      id: Date.now(),
      ...newTransaction,
      date: new Date().toISOString().split('T')[0],
    };
    setTransactions([transaction, ...transactions]);

    // Update balance and specific type (income, expense, savings)
    if (newTransaction.type === 'income') {
      setBalance(prev => prev + Number(newTransaction.amount));
      setIncome(prev => prev + Number(newTransaction.amount));
    } else if (newTransaction.type === 'expense') {
      setBalance(prev => prev - Number(newTransaction.amount));
      setExpense(prev => prev + Number(newTransaction.amount));
    } else if (newTransaction.type === 'savings') {
      setBalance(prev => prev - Number(newTransaction.amount));
      setSavings(prev => prev + Number(newTransaction.amount));
    }

    // Reset new transaction form
    setNewTransaction({ type: 'income', amount: '', description: '' });
  };

  const downloadFinancialRecord = () => {
    const data = JSON.stringify({ balance, income, expense, savings, transactions }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'financial_record.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const chartData = [
    { name: 'Income', amount: income },
    { name: 'Expense', amount: expense },
    { name: 'Savings', amount: savings }, // Added savings to chart data
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name || "User"}!</h1>
      <p className="mb-4">Current Date and Time: {currentDateTime.toLocaleString()}</p>

      {/* Balance, Income, Expense, and Savings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
              Total Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">KSH {balance.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <FontAwesomeIcon icon={faChartLine} className="mr-2" />
              Monthly Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">KSH {income.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <FontAwesomeIcon icon={faPiggyBank} className="mr-2" />
              Monthly Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">KSH {expense.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <FontAwesomeIcon icon={faPiggyBank} className="mr-2" />
              Total Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">KSH {savings.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Transaction */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Add Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleNewTransaction} className="space-y-4">
              <select 
                className="w-full p-2 border rounded"
                value={newTransaction.type}
                onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value})}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
                <option value="savings">Savings</option> {/* New savings option */}
              </select>
              <Input 
                type="number" 
                placeholder="Amount" 
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                required 
              />
              <Input 
                type="text" 
                placeholder="Description" 
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                required 
              />
              <Button type="submit">Add Transaction</Button>
            </form>
          </CardContent>
        </Card>

        {/* Financial Overview Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#8884d8" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {transactions.map(transaction => (
              <li key={transaction.id} className="flex justify-between items-center">
                <span>{transaction.description}</span>
                <span className={transaction.type === 'income' ? 'text-green-500' : transaction.type === 'savings' ? 'text-blue-500' : 'text-red-500'}>
                  {transaction.type === 'income' ? '+' : '-'} KSH {transaction.amount.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Download Financial Record */}
      <Button onClick={downloadFinancialRecord} className="mt-4">
        <Download className="mr-2 h-4 w-4" /> Download Financial Record
      </Button>
    </div>
  );
};

export default Dashboard;
