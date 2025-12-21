export interface Category {
  _id: string;
  name: string;
  createdAt: string;
}

export interface ColorVariant {
  colorName: string;
  imageUrl: string;
  featured?: boolean;
}

export interface Product {
  _id: string;
  categoryId: Category | string;
  modelName: string;
  colors: ColorVariant[];
  pricePerSeries: number;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  modelName: string;
  colorName: string;
  colorImage: string;
  seriesCount: number;
  pricePerSeries: number;
  totalPrice: number;
}

export interface OrderFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order extends OrderFormData {
  _id: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: string;
}
