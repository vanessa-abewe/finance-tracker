// models/account.ts
import mongoose, { Schema, Document } from "mongoose";

// Define the Account interface
export interface Account extends Document {
  name: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const AccountSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    balance: { type: Number, required: true, min: 0 },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Export the model
export default mongoose.models.Account || mongoose.model<Account>("Account", AccountSchema);
