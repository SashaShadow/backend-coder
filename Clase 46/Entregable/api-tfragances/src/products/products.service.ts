import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

    async getProducts(): Promise<Product[]> {
        return this.productModel.find();
      }

    async getProduct(prodId: string): Promise<Product> {
        return this.productModel.findOne({id: prodId});
    }

    async createProduct(product: Product): Promise<Product> {
        const createdProduct = new this.productModel(product);
        return createdProduct.save();
    }

    async updateProduct(product: Product, prodId: string): Promise<Product> {
       return this.productModel.findByIdAndUpdate(prodId, product);
    }

    async deleteProduct(prodId: string): Promise<Product> {
        return this.productModel.findByIdAndDelete(prodId);
    }
}
