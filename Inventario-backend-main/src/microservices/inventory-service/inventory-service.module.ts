import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryServiceController } from './inventory-service.controller';
import { InventoryService } from './inventory-service.service';
import { Product, ProductSchema } from '../../products/schema/product.schema';
import { ProductsModule } from '../../products/products.module'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    ProductsModule, 
  ],
  controllers: [InventoryServiceController],
  providers: [InventoryService],
})
export class InventoryServiceModule {}
