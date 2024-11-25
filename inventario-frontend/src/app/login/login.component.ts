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


  constructor(
    private fb: FormBuilder,
    private userService: UserserviceService,
    private router: Router
  ) {}

  loginData = { username: '', password: '' };
  registerData = { name: '', username: '', password: '', confirmPassword: '', profileImage: null };
  isRegistering = false;

  toggleRegisterForm() {
    this.isRegistering = !this.isRegistering;
  }

  onLogin() {
    if (this.loginData.username && this.loginData.password) {
      this.userService.loginUser(this.loginData).subscribe(
        (response) => {
          console.log('Login exitoso:', response);
          localStorage.setItem('token', response.token); 
          this.router.navigate(['/gestion-usuarios']); 
        },
        (error) => {
          console.error('Error en login:', error);
          alert('Credenciales incorrectas. Inténtalo nuevamente.');
        }
      );
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }
  

  onRegister() {
    
    if (this.registerData.password === this.registerData.confirmPassword) {
      console.log('Registrando usuario con', this.registerData);
    } else {
      console.error('Las contraseñas no coinciden');
    }
  }

  onFileSelected(event: any) {
    this.registerData.profileImage = event.target.files[0];
  }
}
