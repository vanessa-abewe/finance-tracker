import { useState, useEffect } from "react";


interface Account {
  id: number;
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
    <div>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Account Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Balance"
          value={formData.balance}
          onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
        />
        <button type="submit">Add Account</button>
      </form>

      <h3>Accounts:</h3>
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>
            {account.name} - Balance: ${account.balance}
          </li>
        ))}
      </ul>
    </div>
  );
}
