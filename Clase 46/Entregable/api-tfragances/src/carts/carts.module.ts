import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { Cart, CartSchema } from '../schemas/cart.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }])],
  controllers: [CartsController],
  providers: [CartsService]
})
export class CartsModule {}
