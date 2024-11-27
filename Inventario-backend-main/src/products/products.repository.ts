import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schema/product.schema';

@Injectable()
export class ProductsRepository {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

  async create(product: Partial<Product>): Promise<Product> {
    // Autoincremento manual dentro del repositorio
    const lastProduct = await this.productModel.findOne({}, {}, { sort: { code: -1 } }).exec();
    const nextCode = lastProduct ? lastProduct.code + 1 : 1;
    const newProduct = new this.productModel({ ...product, code: nextCode });
    return newProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(code: number): Promise<Product | null> {
    return this.productModel.findOne({ code }).exec();
  }

  async update(code: number, update: Partial<Product>): Promise<Product | null> {
    return this.productModel.findOneAndUpdate({ code }, update, { new: true }).exec();
  }

  async delete(code: number): Promise<number> {
    const result = await this.productModel.deleteOne({ code }).exec();
    return result.deletedCount || 0;
  }
}
