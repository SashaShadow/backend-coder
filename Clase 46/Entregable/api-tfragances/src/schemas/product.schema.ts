
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  stock: number;

  @Prop()
  photo: string;

  @Prop()
  code: string;

  @Prop()
  desc: string;
}

export const ProductSchema  = SchemaFactory.createForClass(Product);
