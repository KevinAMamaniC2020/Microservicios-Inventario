import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from '../../products/products.repository';

@Injectable()
export class InventoryService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async updateInventory({ id, quantity, type }: { id: number; quantity: number; type: 'in' | 'out' }) {
    if (quantity <= 0) {
      throw new BadRequestException('La cantidad debe ser superior a cero.');
    }

    const product = await this.productsRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Producto con codigo "${id}" no encontrado.`);
    }

    const newQuantity = type === 'in' ? product.quantity + quantity : product.quantity - quantity;
    if (newQuantity < 0) {
      throw new BadRequestException('Stock Insuficiente para esta operación.');
    }

    return this.productsRepository.update(id, { quantity: newQuantity });
  }
}
