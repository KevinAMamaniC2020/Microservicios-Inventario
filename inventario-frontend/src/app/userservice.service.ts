import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private baseUrl = 'https://microservices-tais.epis-dev.site/api/users';

  constructor(private http: HttpClient) { }


  //Obtener todos los usuarios
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  //Iniciar sesión
  loginUser(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  //Registrar un nuevo usuario
  registerUser(user: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  //Eliminar un usuario por ID
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}`);
  }
}
