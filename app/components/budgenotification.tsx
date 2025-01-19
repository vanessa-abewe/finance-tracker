import { useState, useEffect } from "react";

interface Props {
  budget: number;
  totalExpense: number;
}

export default function BudgetNotification({ budget, totalExpense }: Props) {
  const [isOverBudget, setIsOverBudget] = useState(false);

  useEffect(() => {
    if (totalExpense > budget) {
      setIsOverBudget(true);
    } else {
      setIsOverBudget(false);
    }
  }, [budget, totalExpense]);

  return (
    <div>
      <p>Budget: ${budget}</p>
      <p>Total Expenses: ${totalExpense}</p>
      {isOverBudget && <p style={{ color: "red" }}>Budget exceeded!</p>}
    </div>
  );
}
