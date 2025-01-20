'use client';
import React, { useState,useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Wallet, TrendingUp, TrendingDown, Bell } from 'lucide-react';
import { Card, CardBody } from "@nextui-org/react";
import Sidebar from './components/sidebar';

interface Transaction {
  type: 'income' | 'expense';
  amount: number;
  date: string;
}

const DecorativeShapes = () => (
  <div className="absolute inset-0 pointer-events-none">
    
    <div className="absolute top-0 right-0">
      <svg width="400" height="400" viewBox="0 0 200 200">
        <circle cx="150" cy="50" r="100" fill="rgba(51, 234, 149, 0.1)" />
      </svg>
    </div>
    
  
    <div className="absolute top-20 left-40">
      <svg width="60" height="60" viewBox="0 0 60 60">
        <rect x="10" y="10" width="40" height="40" transform="rotate(15)" fill="rgba(168, 154, 182, 0.36)" />
      </svg>
    </div>
    
    
    <div className="absolute top-1/3 right-1/4">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <polygon points="40,10 70,70 10,70" fill="rgba(231, 210, 20, 0.4)" />
      </svg>
    </div>
    
    
    <div className="absolute bottom-1/4 right-1/3">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="30" cy="30" r="15" fill="rgba(51, 234, 149, 0.29)" />
        <circle cx="60" cy="40" r="10" fill="rgba(146, 51, 234, 0.28)" />
        <circle cx="40" cy="70" r="20" fill="rgba(231, 210, 20, 0.3)" />
      </svg>
    </div>
    
   
    <div className="absolute bottom-0 left-0">
      <svg width="200" height="100" viewBox="0 0 200 200">
        <path
          d="M 0 100 C 20 80, 40 90, 60 100 S 100 110, 120 100 S 160 90, 180 100 S 220 110, 240 100 V 200 H 0 Z"
          fill="rgba(166, 91, 236, 0.35)"
        />
      </svg>
    </div>
    
    
    <div className="absolute top-1/2 left-20">
      <svg width="70" height="70" viewBox="0 0 70 70">
        <rect x="15" y="15" width="40" height="40" transform="rotate(45 35 35)" fill="rgba(231, 210, 20, 0.35)" />
      </svg>
    </div>
  </div>
);


const FinanceDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    budget: 0,
  });


const processTransactions = (data: Transaction[]) => {
  const totalIncome = data
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = data
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  
  const latestTransactions = data.filter(
    (t) =>
      new Date(t.date).getMonth() === new Date().getMonth() &&
      new Date(t.date).getFullYear() === new Date().getFullYear()
  );

  const monthlyIncome = latestTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = latestTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalBalance,
    monthlyIncome,
    monthlyExpenses,
    budget: totalIncome * 0.8, 
  };
};
const transformForChart = (transactions: Transaction[]) => {
  let balance = 0;
  return transactions.map((transaction) => {
    if (transaction.type === 'income') {
      balance += transaction.amount;
    } else if (transaction.type === 'expense') {
      balance -= transaction.amount;
    }
    return {
      date: new Date(transaction.date).toLocaleDateString(),
      income: transaction.type === 'income' ? transaction.amount : 0,
      expense: transaction.type === 'expense' ? transaction.amount : 0,
      balance,
    };
  });
};

useEffect(() => {
  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      const data = await response.json();
      setTransactions(data);
      const computedStats = processTransactions(data);
      setStats(computedStats);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  fetchTransactions();
}, []);

const chartData = transformForChart(transactions);
  const StatCard = ({ title, value, icon: Icon, color }: { title: string; value: string; icon: React.ElementType; color: string }) => (
    <Card className="shadow-md">
      <CardBody className="flex flex-row items-center justify-between p-6">
        <div>
          <p className="text-sm text-purple-600 font-medium">{title}</p>
          <p className="text-2xl font-bold text-purple-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="text-white" size={24} />
        </div>
      </CardBody>
    </Card>
  );

  
    return (
      <div className="ml-64 min-h-screen bg-white/95 relative">
        <DecorativeShapes />
  
        <div className="p-4 md:p-8 relative z-10">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-2">Financial Dashboard</h1>
            <p className="text-purple-600">Track your expenses and income</p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Balance"
              value={`${stats.totalBalance.toFixed(2)}`}
              icon={Wallet}
              color="bg-purple-600"
            />
            <StatCard
              title="Monthly Income"
              value={`${stats.monthlyIncome.toFixed(2)}`}
              icon={TrendingUp}
              color="bg-purple-500"
            />
            <StatCard
              title="Monthly Expenses"
              value={`${stats.monthlyExpenses.toFixed(2)}`}
              icon={TrendingDown}
              color="bg-purple-400"
            />
            <Card className="shadow-md">
              <CardBody>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-purple-600 font-medium">Budget Status</p>
                  <div className="p-2 rounded-full bg-purple-300">
                    <Bell className="text-white" size={20} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-purple-900 mb-2">
                  {((stats.monthlyExpenses / stats.budget) * 100).toFixed(1)}%
                </p>
                <div className="w-full bg-purple-100 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(stats.monthlyExpenses / stats.budget) * 100}%` }}
                  />
                </div>
              </CardBody>
            </Card>
          </div>
  
          <h2 className="text-xl font-semibold text-purple-900">Financial Overview</h2>
          <Card className="mb-8 shadow-md">
            <CardBody>
              <div className="w-full h-[400px] relative">
              <ResponsiveContainer width="100%" height="100%">
  <LineChart data={chartData}>
    <CartesianGrid strokeDasharray="3 3" stroke="#E9D5FF" />
    <XAxis dataKey="date" stroke="#7E22CE" />
    <YAxis stroke="#7E22CE" />
    <Tooltip
      contentStyle={{
        backgroundColor: 'white',
        border: '1px solid #E9D5FF',
        borderRadius: '0.5rem',
        padding: '1rem',
      }}
    />
    <Legend />
    <Line type="natural" dataKey="income" stroke="#9333EA" strokeWidth={2} />
    <Line type="basis" dataKey="expense" stroke="#7E22CE" strokeWidth={2} />
    <Line type="step" dataKey="balance" stroke="#6B21A8" strokeWidth={2} />
  </LineChart>
</ResponsiveContainer>

              </div>
            </CardBody>
          </Card>
        </div>
  
        <Sidebar />
      </div>
    );
  };

export default FinanceDashboard;
