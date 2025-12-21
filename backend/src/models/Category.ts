import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  createdAt: Date;
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ICategory>('Category', categorySchema);
