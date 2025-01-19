import { toast } from "react-hot-toast";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Select,
  SelectItem,
  Button,
  Input,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { DollarSign, CreditCard, FileText, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const DecorativeCircles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full blur-2xl opacity-60 -mr-16 -mt-16" />
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-60 -ml-16 -mb-16" />
  </div>
);

interface Account {
  _id: string;
  name: string;
  balance: number;
}

export default function AddTransactionModal({
  isOpen,
  onClose,
  onTransactionAdded,
}: {
  isOpen: boolean;
  onClose: () => void;
  onTransactionAdded: (transaction: any) => void;
}) {
  const [formData, setFormData] = useState({
    type: "income",
    amount: "0",
    category: "",
    description: "",
    subcategory: "",
    account: "",
    date: "",
  });

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch("/api/accounts");
        if (!response.ok) throw new Error("Failed to fetch accounts");
        const data = await response.json();
        console.log('Fetched accounts:', data);
        setAccounts(data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
        toast.error("Failed to load accounts.");
      }
    };

    fetchAccounts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(formData.amount);

    if (formData.type === "expense" && selectedAccount && amount > selectedAccount.balance) {
      toast.error("Insufficient funds in the selected account.");
      return;
    }

    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          amount,
          date: formData.date || new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      toast.success("Transaction added successfully!");
      onTransactionAdded(data);
      onClose();
      setFormData({
        type: "income",
        amount: "0",
        category: "",
        subcategory: "",
        description: "",
        account: "",
        date: "",
      });
    } catch (error) {
      console.error("Error submitting transaction:", error);
      toast.error("Failed to add transaction. Please try again.");
    }
  };

  const getSubcategories = (category: string) => {
    switch (category) {
      case "Food":
        return ["Groceries", "Restaurants"];
      case "Transportation":
        return ["Fuel", "Public Transport"];
      case "Utilities":
        return ["Electricity", "Water"];
      default:
        return [];
    }
  };

  const darkModeClasses = {
    base: "max-w-full",
    trigger: "h-14 rounded-2xl bg-gray-700/50 border-2 border-purple-500/20 hover:border-purple-500/40 transition-colors",
    value: "text-lg text-white",
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      classNames={{
        base: "max-w-2xl mx-auto",
        backdrop: "bg-black/50 backdrop-blur-sm",
        body: "p-0",  // Remove default padding
        header: "p-0" // Remove default padding
      }}
    >
      <ModalContent className="relative bg-white rounded-2xl shadow-xl max-h-[85vh] overflow-hidden">
        {(onClose) => (
          <>
            <DecorativeCircles />
            
            {/* Fixed Header */}
            <ModalHeader className="flex flex-col gap-1 text-center p-6 bg-white relative z-10">
              <h2 className="text-2xl font-bold text-gray-900">Add New Transaction</h2>
              <p className="text-gray-400 text-sm">Enter the transaction details below</p>
            </ModalHeader>
            
            {/* Scrollable Content */}
            <ModalBody className="relative z-10 px-6 pb-6 overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Transaction Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Transaction Type</label>
                  <Select
                    placeholder="Select type"
                    selectedKeys={[formData.type]}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as "income" | "expense" })}
                    startContent={formData.type === "income" ? 
                      <ArrowUpCircle className="text-green-500" size={18} /> : 
                      <ArrowDownCircle className="text-red-500" size={18} />
                    }
                    classNames={{
                      base: "max-w-full",
                      trigger: "h-14 rounded-2xl bg-purple-100 border-2 border-purple-500/20 hover:border-purple-500/40 transition-colors",
                      value: "text-lg text-gray-900",
                      popoverContent: "bg-purple-100 text-gray-900 border-2 border-purple-500/20"
                    }}
                  >
                    <SelectItem key="income" value="income" startContent={<ArrowUpCircle className="text-green-500" size={18} />}>
                      Income
                    </SelectItem>
                    <SelectItem key="expense" value="expense" startContent={<ArrowDownCircle className="text-red-500" size={18} />}>
                      Expense
                    </SelectItem>
                  </Select>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Category</label>
                  <Select
                    placeholder="Select category"
                    selectedKeys={formData.category ? [formData.category] : []}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value, subcategory: "" })}
                    classNames={{
                      base: "max-w-full",
                      trigger: "h-14 rounded-2xl bg-purple-100 border-2 border-purple-500/20 hover:border-purple-500/40 transition-colors",
                      value: "text-lg text-gray-900",
                      popoverContent: "bg-purple-100 text-gray-900 border-2 border-purple-500/20"
                    }}
                  >
                    <SelectItem key="Food" value="Food">Food</SelectItem>
                    <SelectItem key="Transportation" value="Transportation">Transportation</SelectItem>
                    <SelectItem key="Utilities" value="Utilities">Utilities</SelectItem>
                  </Select>
                </div>

                {/* Subcategory */}
                {formData.category && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Subcategory</label>
                    <Select
                      placeholder="Select subcategory"
                      selectedKeys={formData.subcategory ? [formData.subcategory] : []}
                      onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                      classNames={{
                        base: "max-w-full",
                        trigger: "h-14 rounded-2xl bg-purple-100 border-2 border-purple-500/20 hover:border-purple-500/40 transition-colors",
                        value: "text-lg text-gray-900",
                        popoverContent: "bg-purple-100 text-gray-900 border-2 border-purple-500/20"
                      }}
                    >
                      {getSubcategories(formData.category).map((sub) => (
                        <SelectItem key={sub} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                )}

                {/* Amount */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Amount</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    startContent={<DollarSign className="text-gray-400" size={18} />}
                    classNames={{
                      input: "bg-purple-100 text-gray-900 rounded-2xl border-2 border-purple-500/20 hover:border-purple-500/40 transition-colors h-14",
                      
                    }}
                  />
                </div>

                          {/* Account Selection */}
                          <Select
  placeholder="Select account"
  selectedKeys={formData.account ? [formData.account] : []}
  onChange={(e) => {
    const key = e.target.value;
    const account = accounts.find((acc) => acc._id === key);
    setFormData({ ...formData, account: key });
    setSelectedAccount(account || null);
  }}
  startContent={<CreditCard className="text-gray-400" size={18} />}
  classNames={{
    base: "max-w-full",
    trigger: "h-14 rounded-2xl text-gray-900 bg-purple-100 border-2 border-purple-500/20 hover:border-purple-500/40 transition-colors",
    value: "text-lg text-gray-900",
    popoverContent: "text-gray-900 bg-purple-100 border-2 border-purple-500/20"
  }}
  renderValue={(items) => {
    const selectedAccount = accounts.find(acc => acc._id === items[0]?.key);
    return selectedAccount ? (
      <div className="flex justify-between items-center">
        <span className="text-gray-900">{selectedAccount.name}</span>
        <span className="text-sm text-gray-500">
          Balance: ${selectedAccount.balance}
        </span>
      </div>
    ) : null;
  }}
>
  {accounts.map((account) => (
    <SelectItem key={account._id} value={account._id}>
      <div className="flex justify-between items-center w-full">
        <span className="text-gray-900">{account.name}</span>
        <span className="text-sm text-gray-500">
          Balance: ${account.balance}
        </span>
      </div>
    </SelectItem>
  ))}
</Select>

{formData.account && (
  <p className="text-sm text-gray-500 mt-1">
    Selected: {accounts.find(a => a._id === formData.account)?.name || 'No account selected'} (Balance: ${(accounts.find(a => a._id === formData.account)?.balance || 0).toFixed(2)})
  </p>
)}


                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Description</label>
                  <FileText className="text-gray-400" size={18} />
                  <Input
                    type="text"
                    placeholder="Enter description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    classNames={{
                      input: "bg-purple-100 text-gray-900 rounded-2xl border-2 border-purple-500/20 hover:border-purple-500/40 transition-colors h-14",
                     
                    }}
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    onClick={onClose}
                    className="flex-1 rounded bg-gray-500 text-white hover:bg-gray-600 h-14"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 rounded bg-purple-500 text-white hover:bg-purple-700 h-14"
                  >
                    Add Transaction
                  </Button>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
