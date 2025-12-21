import mongoose, { Document, Schema } from 'mongoose';

export interface IColorVariant {
  colorName: string;
  imageUrl: string;
  featured: boolean;
}

export interface IProduct extends Document {
  categoryId: mongoose.Types.ObjectId;
  modelName: string;
  colors: IColorVariant[];
  pricePerSeries: number;
  createdAt: Date;
}

const productSchema = new Schema<IProduct>({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  modelName: {
    type: String,
    required: true,
  },
  colors: [{
    colorName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  }],
  pricePerSeries: {
    type: Number,
    default: 2250,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IProduct>('Product', productSchema);
