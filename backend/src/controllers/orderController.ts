import { Response, Request } from 'express';
import { AuthRequest } from '../middleware/auth';
import Order from '../models/Order';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, address, items, totalAmount } = req.body;

    const order = new Order({
      firstName,
      lastName,
      email,
      phone,
      address,
      items,
      totalAmount,
    });

    await order.save();
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
