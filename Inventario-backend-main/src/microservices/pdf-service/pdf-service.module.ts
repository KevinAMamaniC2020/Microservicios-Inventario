import { Module } from '@nestjs/common';
import { PdfService } from './pdf-service.service';
import { PdfServiceController } from './pdf-service.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../../products/schema/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [PdfServiceController],
  providers: [PdfService],
  exports: [PdfService],
})
export class PdfServiceModule {}
