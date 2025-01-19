import { NextResponse } from "next/server";
import connectToDatabase from "../../db";
import Transaction from "../../models/transaction";

async function connectDB() {
  await connectToDatabase();
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // Extract the `id` query parameter

    await connectDB();

    if (id) {
      // Fetch a specific transaction by ID
      const transaction = await Transaction.findById(id);

      if (!transaction) {
        return NextResponse.json(
          { error: "Transaction not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(transaction, { status: 200 });
    } else {
      // Fetch all transactions if no `id` is provided
      const transactions = await Transaction.find({});
      return NextResponse.json(transactions, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
