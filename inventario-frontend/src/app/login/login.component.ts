import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from '../userservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginData = { username: '', password: '' };
  registerData = { name: '', username: '', password: '', confirmPassword: '', profileImage: '' };
  isRegistering = false;
  isLoading = false; // Para manejar el estado de carga

  constructor(private userService: UserserviceService, private router: Router) {}

  // Cambiar entre el formulario de login y registro
  toggleRegisterForm() {
    this.isRegistering = !this.isRegistering;
  }

  

  // Lógica para iniciar sesión
  onLogin() {
    if (this.loginData.username && this.loginData.password) {
      this.isLoading = true;
      this.userService.loginUser(this.loginData).subscribe(
        (response) => {
          this.isLoading = false;
          console.log('Login exitoso:', response);
          localStorage.setItem('token', response.token); // Guardar token si la API lo devuelve
          alert('Inicio de sesión exitoso.');
          this.router.navigate(['/listuser']); // Redirigir a la gestión de usuarios
        },
        (error) => {
          this.isLoading = false;
          console.error('Error en login:', error);
          alert('Error en las credenciales. Inténtalo nuevamente.');
        }
      );
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }

  // Lógica para registrar un usuario
  onRegister() {
    if (this.registerData.password === this.registerData.confirmPassword) {
      const formData = new FormData();
      formData.append('name', this.registerData.name);
      formData.append('username', this.registerData.username);
      formData.append('password', this.registerData.password);
      if (this.registerData.profileImage) {
        formData.append('profile_image', 'https://example.com/path/to/image.jpg');

      }

      this.isLoading = true;
      this.userService.registerUser(formData).subscribe(
        (response) => {
          this.isLoading = false;
          console.log('Usuario registrado:', response);
          alert('Registro exitoso. Ahora puedes iniciar sesión.');
          this.toggleRegisterForm(); // Cambiar al formulario de login
        },
        (error) => {
          this.isLoading = false;
          console.error('Error en registro:', error);
          alert('Error al registrar el usuario. Intenta nuevamente.');
        }
      );
    } else {
      alert('Las contraseñas no coinciden. Por favor, verifica e inténtalo nuevamente.');
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.registerData.profileImage = file;
      console.log('Imagen seleccionada:', file);
    } else {
      console.error('No se seleccionó ninguna imagen.');
    }
  }
  

  // Método para obtener usuarios y mostrarlos en la consola
  getUsers() {
    this.userService.getUsers().subscribe(
      (users) => {
        console.log('Lista de usuarios:', users);
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }
}
