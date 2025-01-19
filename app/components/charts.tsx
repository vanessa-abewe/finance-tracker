// import { useEffect, useState } from "react";
// import { Pie } from "react-chartjs-2";

// export default function Chart() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const fetchTransactions = async () => {
//     const response = await fetch("/api/transactions");
//     const transactions = await response.json();
//     const expenseData = transactions.reduce((acc, transaction) => {
//       if (transaction.type === "expense") {
//         acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
//       }
//       return acc;
//     }, {});

//     setData({
//       labels: Object.keys(expenseData),
//       datasets: [
//         {
//           data: Object.values(expenseData),
//           backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//         },
//       ],
//     });
//   };

//   return <Pie data={data} />;
// }
