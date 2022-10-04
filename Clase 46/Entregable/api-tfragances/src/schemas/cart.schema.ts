
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CreatedProduct } from 'src/carts/cart.dto';

export type CartDocument = Cart & Document;

@Schema({ timestamps: false })
export class Cart {
  @Prop()
  products: CreatedProduct[];

  @Prop()
  owner: string;
}

export const CartSchema  = SchemaFactory.createForClass(Cart);
