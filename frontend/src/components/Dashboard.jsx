import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Download, DollarSign,  ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  useAuth();
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({ type: 'income', amount: '', description: '' });
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Fetch user's financial data
    // This is a placeholder. In a real app, you'd fetch this from your backend
    const fetchData = async () => {
      // Simulating API call
      const data = {
        balance: 5000,
        income: 10000,
        expense: 5000,
        transactions: [
          { id: 1, type: 'income', amount: 5000, description: 'Salary', date: '2023-06-01' },
          { id: 2, type: 'expense', amount: 1000, description: 'Rent', date: '2023-06-02' },
          { id: 3, type: 'expense', amount: 500, description: 'Groceries', date: '2023-06-03' },
        ]
      };
      setBalance(data.balance);
      setIncome(data.income);
      setExpense(data.expense);
      setTransactions(data.transactions);
    };
    fetchData();

    // Update current date and time every second
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNewTransaction = (e) => {
    e.preventDefault();
    const transaction = {
      id: Date.now(),
      ...newTransaction,
      date: new Date().toISOString().split('T')[0]
    };
    setTransactions([transaction, ...transactions]);
    setBalance(prev => newTransaction.type === 'income' ? prev + Number(newTransaction.amount) : prev - Number(newTransaction.amount));
    setIncome(prev => newTransaction.type === 'income' ? prev + Number(newTransaction.amount) : prev);
    setExpense(prev => newTransaction.type === 'expense' ? prev + Number(newTransaction.amount) : prev);
    setNewTransaction({ type: 'income', amount: '', description: '' });
  };

  const downloadFinancialRecord = () => {
    const data = JSON.stringify({ balance, income, expense, transactions }, null, 2);
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
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="mb-4">Current Date and Time: {currentDateTime.toLocaleString()}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSH {balance.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSH {income.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expenses</CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSH {expense.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>
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
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {transactions.map(transaction => (
              <li key={transaction.id} className="flex justify-between items-center">
                <span>{transaction.description}</span>
                <span className={transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}>
                  {transaction.type === 'income' ? '+' : '-'} KSH {transaction.amount.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Button onClick={downloadFinancialRecord} className="mt-4">
        <Download className="mr-2 h-4 w-4" /> Download Financial Record
      </Button>
    </div>
  );
};

export default Dashboard;