import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schema/product.schema';

@Injectable()
export class ProductsRepository {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

  async create(product: Partial<Product>): Promise<Product> {
    const newProduct = new this.productModel(product);
    return newProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(code: string): Promise<Product | null> {
    return this.productModel.findOne({ code }).exec();
  }

  async update(code: string, update: Partial<Product>): Promise<Product | null> {
    return this.productModel.findOneAndUpdate({ code }, update, { new: true }).exec();
  }

  async delete(code: string): Promise<number> {
    const result = await this.productModel.deleteOne({ code }).exec();
    return result.deletedCount || 0;
  }
}
