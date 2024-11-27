import { Controller, Get, Res, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf-service.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../../products/schema/product.schema';

@Controller('pdf')
export class PdfServiceController {
  constructor(
    private readonly pdfService: PdfService,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  @Get('export')
  async exportToPDF(@Res() res: Response) {
    try {
      // Obtener productos desde la base de datos
      const products = await this.productModel.find().exec();
      if (!products || products.length === 0) {
        throw new HttpException('No hay datos para generar el PDF', HttpStatus.NOT_FOUND);
      }

      // Generar el PDF como stream
      const pdfBuffer = await this.pdfService.createPDFStream(products);

      // Configurar encabezados para la respuesta
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="inventory-report.pdf"');

      // Enviar el buffer del PDF
      res.end(pdfBuffer);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      throw new HttpException('Error al generar el PDF', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
