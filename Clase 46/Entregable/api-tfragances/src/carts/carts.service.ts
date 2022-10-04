import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from '../schemas/cart.schema';
import { Product } from '../schemas/product.schema';
import { CreatedProduct } from 'src/carts/cart.dto';


@Injectable()
export class CartsService {
    constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

    async getCarts(): Promise<Cart[]> {
        return this.cartModel.find();
      }

    async getCartProducts(cartId: string) {
        const foundCartProds = this.cartModel.find({id: cartId}, {products: 1});
        return foundCartProds;
    }

    async addToCart(ownerId: string, product: CreatedProduct): Promise<Cart> {
        const foundCart = await this.cartModel.findOne({owner: ownerId}).exec(); 

        if (foundCart) {
            const found = foundCart.products.find(prod => prod.code === product.code);
            if (found) {
                found.quantity += product.quantity;  
                foundCart.markModified('products');
                foundCart.save();

                return foundCart;
            } else {
                foundCart.products.push(product);
                foundCart.markModified('products');
                foundCart.save();
                return foundCart;
            }
          } else {
            const newCart = new this.cartModel();
            newCart.owner = ownerId;
            newCart.products.push(product);
              newCart.save();
              return newCart;
          }
    }

    async deleteCartProd(ownerId: string, prodId: string) {
        const isDeleted = this.cartModel.updateOne({owner: ownerId}, { $pull: {products: {_id: prodId}}});
      return (await isDeleted).modifiedCount
    }

    async deleteCart(cartId: string) {
      const isDeleted = await this.cartModel.findByIdAndDelete(cartId);
      return isDeleted;
    } 
}
