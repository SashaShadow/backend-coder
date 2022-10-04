import { Controller, Body, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { CreateProductDTO } from './product.dto';
import { ProductsService } from './products.service';
import { Product } from '../schemas/product.schema';

@Controller('/api/products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) {}

    @Get()
    async getProducts(): Promise<Product[]> {
        return this.productService.getProducts();
    }

    @Get(':id') 
    async getProduct(@Param() id: string): Promise<Product> {
        return this.productService.getProduct(id);
    }

    @Post()
    async createProduct(@Body() product: CreateProductDTO): Promise<Product> {
        return this.productService.createProduct(product);
    }

    @Put(':id')
    async updateProduct(@Body() product: CreateProductDTO, @Param() id): Promise<Product> {
        return this.productService.updateProduct(product, id.id);
    }

    @Delete(':id')
    async deleteProduct(@Param() id): Promise<Product> {
        return this.productService.deleteProduct(id.id);
    }
}
