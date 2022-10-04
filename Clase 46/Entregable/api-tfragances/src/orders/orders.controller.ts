import { Controller, Body, Get, Post } from '@nestjs/common';
import { CreateOrderDTO } from './order.dto';
import { OrdersService } from './orders.service';
import { Order } from '../schemas/order.schema';


@Controller('/api/orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService) {}

    @Get()
    async getOrders(): Promise<Order[]> {
        return this.orderService.getOrders();
    }

    @Post()
    async createOrder(@Body() order: CreateOrderDTO): Promise<Order> {
        console.log(order);
        return this.orderService.createOrder(order);
    }
}
