import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description?: string;
  parentCategory?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  parentCategory: { type: Schema.Types.ObjectId, ref: 'Category' },
}, { timestamps: true });
  export const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);