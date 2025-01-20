import { Button } from "@nextui-org/react";

import Link from "next/link";


export default function Sidebar() {
  
  // Explicit functions for handling modal visibility
 

  return (
    <div className="w-64 h-screen bg-purple-200 p-4 fixed left-0 top-0">
      <div className="absolute top-[-30px] left-[-30px] bg-yellow-300 w-24 h-24 rounded-full blur-2xl"></div>
      <div className="absolute bottom-[-30px] right-[-30px] bg-blue-400 w-32 h-32 rounded-full blur-2xl"></div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-purple-900">Finance Tracker</h2>
        
        <Link href="/transactions">
          <Button
            color="primary"
            className="text-purple-900 mt-20"
          >
            Transactions
          </Button>
        </Link>

        <Link href="/accounts">
          <Button
            color="primary"
            className="text-purple-900 mt-10"
          >
            My Accounts
          </Button>
        </Link>
       

       
      </div>
      <Link href="/">
          <Button
            color="primary"
            className="text-purple-900 mt-10 "
          >
            overview
          </Button>
        </Link>
    </div>
  );
}