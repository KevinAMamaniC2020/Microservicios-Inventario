import { Controller, Post, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Patch('update-inventory')
  async updateInventory(@Body() updateInventoryDto: UpdateInventoryDto) {
    return this.productsService.updateInventory(updateInventoryDto.code, updateInventoryDto.quantity);
  }

  @Delete(':code')
  async deleteProduct(@Param('code') code: number) {
    return this.productsService.deleteProduct(code);
  }
}
