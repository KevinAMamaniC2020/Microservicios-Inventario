import { Controller, Post, Get, Body, Patch, Query, Delete, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { FilterProductDto } from './dto/filter-product.dto';

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
    return this.productsService.updateInventory(
      updateInventoryDto.code,
      updateInventoryDto.quantity,
    );
  }

  @Get('filter')
  async filterProducts(@Query() filter: FilterProductDto) {
    return this.productsService.filterProducts(filter);
    }
  @Delete(':code')
  async deleteProduct(@Param('code') code: string) {
    return this.productsService.deleteProduct(code);
  }
}
