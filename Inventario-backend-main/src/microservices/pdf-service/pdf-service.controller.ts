import { Controller, Get, Res } from '@nestjs/common';
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
    const products = await this.productModel.find().exec();
    // Generar el PDF
    const pdfBuffer = this.pdfService.generatePDF(products);
    // Configurar los encabezados para descargar el PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="inventory-report.pdf"');
    // Enviar el buffer del PDF como respuesta
    res.send(pdfBuffer);
  }
}
