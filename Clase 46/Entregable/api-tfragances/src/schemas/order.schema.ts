
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CreatedProduct } from 'src/carts/cart.dto';

export type OrderDocument = Order & Document;

@Schema()
export class Client {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  phone: number;

  @Prop()
  address: string;
}

@Schema()
export class OrderType {
  @Prop()
  products: CreatedProduct[];

  @Prop()
  total: number;

  @Prop()
  orderNo: string;
}

@Schema({ timestamps: false })
export class Order {
  
  @Prop()
  client: Client;

  @Prop()
  order: OrderType;

  @Prop()
  owner: string;
}

export const OrderSchema  = SchemaFactory.createForClass(Order);
