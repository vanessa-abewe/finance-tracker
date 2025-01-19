// models/Transaction.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
    amount: number;
    type: 'income' | 'expense';
    category: string;
    subcategory?: string;  // Add subcategory here
    account: string;
    description?: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}

const TransactionSchema: Schema = new Schema({
    amount: { type: Number, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    category: { type: String, required: true },  // Category is required
    subcategory: { type: String },  // Subcategory is optional
    account: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);
