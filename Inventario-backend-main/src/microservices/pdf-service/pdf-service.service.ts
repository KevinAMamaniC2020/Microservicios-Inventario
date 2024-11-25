import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit'; 

@Injectable()
export class PdfService {
  generatePDF(data: any[]): Buffer {
    const doc = new PDFDocument();
    const buffers = [];

    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', () => {});

    doc.fontSize(18).text('Inventory Report', { align: 'center' });
    doc.moveDown();

    data.forEach((item) => {
      doc
        .fontSize(12)
        .text(
          `Codigo: ${item.code}, Nombre: ${item.name}, Cantidad: ${item.quantity}, Precio: $${item.price}, Category: ${item.category}`
        );
      doc.moveDown();
    });

    doc.end();

    return Buffer.concat(buffers);
  }
}
