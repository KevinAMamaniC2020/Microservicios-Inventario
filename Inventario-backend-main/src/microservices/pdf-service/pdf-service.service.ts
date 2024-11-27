import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class PdfService {
  async createPDFStream(data: any[]): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const buffers: Buffer[] = [];

      // Registrar eventos para construir el PDF
      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', (err) => reject(err));

      // Título del reporte
      doc.fontSize(18).text('Reporte de Inventario', { align: 'center' });
      doc.moveDown();

      // Añadir contenido al PDF
      data.forEach((item, index) => {
        doc
          .fontSize(12)
          .text(
            `${index + 1}. Código: ${item.code} | Nombre: ${item.name} | Cantidad: ${item.quantity} | Precio: $${item.price} | Categoría: ${item.category}`
          );
        doc.moveDown();
      });

      // Finalizar el documento
      doc.end();
    });
  }
}
