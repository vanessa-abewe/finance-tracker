import mongoose, { Schema, Document } from 'mongoose';
export interface IBudget extends Document {
    category: mongoose.Types.ObjectId;
    amount: number;
    period: 'monthly' | 'yearly';
    startDate: Date;
    endDate?: Date;
    createdAt: Date;
    updatedAt: Date;
  }
  
  const BudgetSchema: Schema = new Schema({
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    amount: { type: Number, required: true },
    period: { type: String, enum: ['monthly', 'yearly'], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
  }, { timestamps: true });

  

export default mongoose.models.Budget || mongoose.model<IBudget>('Budget', BudgetSchema);