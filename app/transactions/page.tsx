'use client';
import React, { useState, useEffect } from 'react';
import { format } from "date-fns";
import { Button } from "@nextui-org/react";
import { TrendingUp, TrendingDown } from 'lucide-react';

import Sidebar from '../components/sidebar';
import AddTransactionModal from '../components/addTransaction';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';

interface Transaction {
  type: string;
  category: string;
  amount: number;
  account: string;
  date: string;
}

const TransactionsTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filterDate, setFilterDate] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
 
  const [isLoading, setIsLoading] = useState(false);
  const [accounts, setAccounts] = useState<Array<{ _id: string, name: string }>>([]);

  
  useEffect(() => {
    fetch("/api/accounts")
      .then((res) => res.json())
      .then((data) => setAccounts(data))
      .catch((err) => console.error("Error fetching accounts:", err));
  }, []);

 
useEffect(() => {
  fetch("/api/transactions")
    .then((res) => res.json())
    .then((data) => {
      const transactionsArray = Array.isArray(data) ? data : [];
      const sortedTransactions = transactionsArray.sort((a: Transaction, b: Transaction) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setTransactions(sortedTransactions);
    })
    .catch((err) => console.error("Error fetching transactions:", err));
}, []);


  const handleAddTransaction = (newTransaction: Transaction) => {
    setTransactions((prev) => [newTransaction, ...prev]);
  };
  
  const filteredTransactions = transactions.filter((transaction) =>
    filterDate
      ? format(new Date(transaction.date), "yyyy-MM-dd") ===
        format(new Date(filterDate), "yyyy-MM-dd")
      : true
  );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const displayedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterDate(e.target.value);
  };

 
const handleViewDetails = (transaction: Transaction) => {
  setIsLoading(true);
  
  const accountName = accounts.find(acc => acc._id === transaction.account)?.name || transaction.account;
  setSelectedTransaction({...transaction, account: accountName});
  setDetailsModalOpen(true);
  setIsLoading(false);
};

  const TableSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-12 bg-purple-200 mb-4 rounded-lg"></div>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="h-16 bg-purple-100 mb-2 rounded-lg"></div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-purple-50 py-8 pl-72">
      <Sidebar />
      <div className="relative p-6 right-50 bg-purple-100 shadow-lg rounded-lg max-w-screen-lg mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <Button
            color="primary"
            className="bg-purple-300 hover:bg-purple-400 text-purple-900 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
            onPress={() => setIsOpen(true)}
          >
            Add Transaction
          </Button>
          <AddTransactionModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onTransactionAdded={handleAddTransaction}
          />
          <input
            type="date"
            value={filterDate || ""}
            onChange={handleDateChange}
            className="p-2 rounded-md border border-purple-300 shadow-sm focus:ring-2 focus:ring-purple-400 text-gray-500"
            placeholder="Filter by Date"
          />
        </div>

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-purple-200 text-purple-900">
              <tr>
                <th className="text-left px-4 py-2 border-b border-purple-300">Type</th>
                <th className="text-left px-4 py-2 border-b border-purple-300">Category</th>
                <th className="text-left px-4 py-2 border-b border-purple-300">Amount</th>
                <th className="text-left px-4 py-2 border-b border-purple-300">Account</th>
                <th className="text-left px-4 py-2 border-b border-purple-300">Date</th>
               
              </tr>
            </thead>
            <tbody>
              {displayedTransactions.map((transaction, index) => (
                <tr
                  key={index}
                  className="odd:bg-purple-50 even:bg-purple-100 hover:bg-purple-200"
                >
                  <td className="px-4 py-2 border-b border-purple-300 text-gray-700">
                    <div className="flex items-center gap-2">
                      {transaction.type === "income" ? (
                        <TrendingUp className="text-green-500" />
                      ) : (
                        <TrendingDown className="text-red-500" />
                      )}
                      {transaction.type}
                    </div>
                  </td>
                  <td className="px-4 py-2 border-b border-purple-300 text-gray-700">
                    {transaction.category}
                  </td>
                  <td className="px-4 py-2 border-b border-purple-300 text-gray-700">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border-b border-purple-300 text-gray-700">
  {accounts.find(acc => acc._id === transaction.account)?.name || transaction.account}
</td>

                  <td className="px-4 py-2 border-b border-purple-300 text-gray-700">
                    {format(new Date(transaction.date), "yyyy-MM-dd")}
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-purple-700 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-purple-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

     
   
    </div>
  );
};

export default TransactionsTable;
