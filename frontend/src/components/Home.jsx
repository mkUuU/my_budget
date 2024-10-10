import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, DollarSign, PiggyBank, TrendingUp } from "lucide-react"

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Welcome to Budget Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card text-card-foreground rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <DollarSign className="mr-2 h-6 w-6" />
            Track Expenses
          </h2>
          <p>Easily log and categorize your daily expenses to keep a close eye on your spending habits.</p>
        </div>
        <div className="bg-card text-card-foreground rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <PiggyBank className="mr-2 h-6 w-6" />
            Set Savings Goals
          </h2>
          <p>Define and track your savings goals, whether it's for a vacation, a new car, or an emergency fund.</p>
        </div>
        <div className="bg-card text-card-foreground rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <TrendingUp className="mr-2 h-6 w-6" />
            Visualize Progress
          </h2>
          <p>View intuitive charts and graphs to understand your financial progress at a glance.</p>
        </div>
      </div>
      <div className="text-center">
        <Link to="/login" className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-opacity-90 inline-flex items-center">
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default Home;