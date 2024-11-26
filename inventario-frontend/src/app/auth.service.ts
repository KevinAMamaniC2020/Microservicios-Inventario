import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly testUsername = 'usuarioPrueba';  // Usuario de prueba
  private readonly testPassword = 'contraseñaPrueba';  // Contraseña de prueba

  constructor() { }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = localStorage.getItem('userToken');
    if (!token) return false;
    
    // Lógica adicional para verificar la validez del token, como la expiración
    // Si usas JWT, puedes decodificar y validar el token aquí, por ejemplo:
    // const decodedToken = jwt_decode(token);
    // return decodedToken.exp > Date.now() / 1000;  // Verificar si el token ha expirado
    
    return true;  // Si hay un token, se asume que el usuario está autenticado
  }

  setAuthenticated(token: string): void {
    localStorage.setItem('userToken', token); // Guarda el token proporcionado
  }

  // Método para hacer login con las credenciales
  login(username: string, password: string): boolean {
    // Verificar las credenciales contra los valores definidos
    if (username === this.testUsername && password === this.testPassword) {
      // Si las credenciales son correctas, guardar el token en localStorage
      const userToken = 'someAuthToken'; // Token ficticio
      localStorage.setItem('userToken', userToken);
      return true;
    } else {
      // Si las credenciales son incorrectas, retornar false
      return false;
    }
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('userToken'); // Eliminar el token al hacer logout
  }
}
