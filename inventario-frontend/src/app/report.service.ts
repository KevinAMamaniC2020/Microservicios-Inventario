import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private baseUrl = 'https://microservices-tais.epis-dev.site/api/pdf/export'; // URL de la API para exportar el PDF

  constructor(private http: HttpClient) {}

  downloadPdf(): Observable<Blob> {
    return this.http.get(this.baseUrl, { responseType: 'blob' });
  }
}