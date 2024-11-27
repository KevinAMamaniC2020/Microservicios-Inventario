import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schema/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

  // Crear un nuevo producto con autoincremento manual
  async create(createProductDto: CreateProductDto): Promise<Product> {
    // Busca el último producto creado para determinar el próximo valor de `code`
    const lastProduct = await this.productModel.findOne({}, {}, { sort: { code: -1 } }).exec();
    const nextCode = lastProduct ? lastProduct.code + 1 : 1;

    // Crea el producto con el nuevo valor de `code`
    const product = new this.productModel({ ...createProductDto, code: nextCode });
    return product.save();
  }

  // Obtener todos los productos
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  // Actualizar inventario
  async updateInventory(code: number, quantity: number): Promise<Product> {
    const product = await this.productModel.findOne({ code }).exec();
    if (!product) {
      throw new NotFoundException(`Producto con código "${code}" no encontrado.`);
    }
    product.quantity += quantity;
    if (product.quantity < 0) {
      throw new NotFoundException('La cantidad no puede ser inferior a cero.');
    }
    return product.save();
  }

  // Eliminar producto
  async deleteProduct(code: number): Promise<{ message: string }> {
    const result = await this.productModel.deleteOne({ code }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Producto con código "${code}" no encontrado.`);
    }
    return { message: `Producto con código "${code}" eliminado con éxito.` };
  }
}
