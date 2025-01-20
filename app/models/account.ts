
import mongoose, { Schema, Document } from "mongoose";


export interface Account extends Document {
  name: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}


const AccountSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    balance: { type: Number, required: true, min: 0 },
  },
  { timestamps: true } 
);


export default mongoose.models.Account || mongoose.model<Account>("Account", AccountSchema);
