import { NextResponse } from "next/server";
import connectToDatabase from "../../db";
import Transaction from "../../models/transaction";

// Connect to the database
async function connectDB() {
  await connectToDatabase();
}

// Handle GET requests
export async function GET() {
  try {
    await connectDB();
    const transactions = await Transaction.find({});
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Handle POST requests
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, amount, category, subcategory, account, date } = body;

    // Validate incoming data
    if (!type || !amount || !category || !account || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();

    // Create and save a new transaction
    const newTransaction = new Transaction({
      type,
      amount,
      category,
      subcategory,  // Ensure subcategory is passed and saved
      account,
      date: new Date(date),
    });

    const savedTransaction = await newTransaction.save();

    return NextResponse.json(savedTransaction, { status: 201 });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
