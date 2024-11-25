import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schema/product.schema';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

  async create(createProductDto: any): Promise<Product> {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async updateInventory(code: string, quantity: number): Promise<Product> {
    const product = await this.productModel.findOne({ code }).exec();
    if (!product) {
      throw new NotFoundException(`Producto con codigo "${code}" no encontrado.`);
    }
    product.quantity += quantity;
    if (product.quantity < 0) {
      throw new NotFoundException('La cantidad no puede ser inferior a cero.');
    }
    return product.save();
  }

  async filterProducts(filter: any): Promise<Product[]> {
    const query = {};
    if (filter.category) query['category'] = filter.category;
    if (filter.minPrice || filter.maxPrice) {
      query['price'] = {};
      if (filter.minPrice) query['price'].$gte = filter.minPrice;
      if (filter.maxPrice) query['price'].$lte = filter.maxPrice;
    }
    return this.productModel.find(query).exec();
  }

  async deleteProduct(code: string): Promise<{ message: string }> {
    const result = await this.productModel.deleteOne({ code }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Producto con codigo "${code}" no encontrado.`);
    }
    return { message: `Producto con codigo "${code}" eliminado con éxito.` };
  }
}
