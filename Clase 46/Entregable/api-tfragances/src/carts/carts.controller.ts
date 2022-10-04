import { Controller, Body, Get, Post, Delete, Param, Res } from '@nestjs/common';
import { CartsService } from './carts.service';
import { Cart } from '../schemas/cart.schema';
import { CreatedProduct } from 'src/carts/cart.dto';

@Controller('/api/carts')
export class CartsController {
    constructor(private readonly cartService: CartsService) {}

    @Get()
    async getCarts(): Promise<Cart[]> {
        return this.cartService.getCarts();
    }

    @Get(':cartId/products')
    async getCartProducts(@Param('cartId') id: string) {
        return this.cartService.getCartProducts(id)
    }

    @Post(':ownerId/products')
    async addToCart(@Param('ownerId') id: string, @Body() product: CreatedProduct): Promise<Cart> {
        return this.cartService.addToCart(id, product);
    }

    @Delete(':ownerId/products/:prodId')
    async deleteCartProd(@Param('ownerId') id: string, @Param('prodId') prodId: string, @Res() res: any) {
        this.cartService.deleteCartProd(id, prodId)
        .then(isDeleted => {
            isDeleted ? res.status(200).json({message: 'Product deleted from cart'}) :
            res.status(404).json({error: 'Product not found'})
        })
    }

    @Delete(':cartId')
    async deleteCart(@Param('cartId') id: string, @Res() res: any) {
        this.cartService.deleteCart(id)
        .then(isDeleted => {
            isDeleted ? res.status(200).json(isDeleted) : 
            res.status(404).json({error: 'Cart not found'});
        })
    }
}
