import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  modelName: string;
  colorName: string;
  seriesCount: number;
  pricePerSeries: number;
  totalPrice: number;
}

export interface IOrder extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  items: IOrderItem[];
  totalAmount: number;
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  items: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    modelName: String,
    colorName: String,
    seriesCount: Number,
    pricePerSeries: Number,
    totalPrice: Number,
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IOrder>('Order', orderSchema);
