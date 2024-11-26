import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { InventoryServiceModule } from './microservices/inventory-service/inventory-service.module';
import { PdfServiceModule } from './microservices/pdf-service/pdf-service.module'; 
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://26jhonluna:EEcgXtEajQigYCx1@inventario.kfphk.mongodb.net/inventory'),
    ProductsModule,
    InventoryServiceModule,
    PdfServiceModule,
  ],
})
export class AppModule {}
