'use client';
import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
interface Account {
  id: string;
  name: string;
  balance: number;
}

export default function AccountManager() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [formData, setFormData] = useState({ name: "", balance: "" });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const response = await fetch("/api/accounts");
      const data = await response.json();
      console.log(data);
    setAccounts(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setFormData({ name: "", balance: "" });
    fetchAccounts();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Sidebar/>
      <div className="max-w-xl mx-auto mb-8 bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Account Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            placeholder="Balance"
            value={formData.balance}
            onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            Add Account
          </button>
        </form>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Accounts</h3>
      <div className="ml-64 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <div
        key={account.id}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
          >
        <h4 className="text-lg font-bold">{account.name}</h4>
        <p className="text-sm">Balance</p>
        <p className="text-2xl font-semibold">${account.balance}</p>
        <div className="mt-4">
          <p className="text-xs text-indigo-200">Account ID: {account.id}</p>
        </div>
          </div>
        ))}
      </div>
    </div>
  );
}
