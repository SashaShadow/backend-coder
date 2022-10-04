import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from '../schemas/order.schema';


@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

    async getOrders(): Promise<Order[]> {
        return this.orderModel.find();
    }

    async createOrder(order: Order): Promise<Order> {
        const newOrder = new this.orderModel(order)
        return newOrder.save();
    }
}
