import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  _id: string;
  code: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  category: string;
  __v?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'https://microservices-tais.epis-dev.site/api/products'; // URL base del servicio

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  // Crear un nuevo producto
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  // Actualizar inventario
  updateInventory(updateData: { code: string; quantity: number }): Observable<Product> {
    return this.http.patch<Product>(`${this.baseUrl}/update-inventory`, updateData);
  }

  // Filtrar productos
  filterProducts(params: { [key: string]: string | number }): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/filter`, { params });
  }

  // Eliminar un producto por su código
  deleteProduct(code: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${code}`);
  }
}
