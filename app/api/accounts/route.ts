
import { NextResponse } from "next/server";
import dbConnect from "../../db";
import Account from "../../models/account";


export async function GET() {
  try {
    
    await dbConnect();

    
    const accounts = await Account.find({});
    return NextResponse.json(accounts, { status: 200 });
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, balance } = body;

   
    if (!name || balance === undefined || isNaN(balance)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await dbConnect();

    
    const newAccount = new Account({
      name,
      balance: parseFloat(balance),
    });

    const savedAccount = await newAccount.save();

    return NextResponse.json(savedAccount, { status: 201 });
  } catch (error) {
    console.error("Error creating account:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
