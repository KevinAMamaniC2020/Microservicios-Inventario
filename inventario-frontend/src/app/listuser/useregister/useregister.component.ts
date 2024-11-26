import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserserviceService } from '../../userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-useregister',
  standalone: false,
  
  templateUrl: './useregister.component.html',
  styleUrl: './useregister.component.css'
})
export class UseregisterComponent {

  registrationForm: FormGroup;
  previewImage: string | null = null; // Para mostrar la previsualización de la imagen

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UseregisterComponent>,
    private userService: UserserviceService, // Inyectar el servicio
    private snackBar: MatSnackBar // Para mostrar mensajes al usuario
  ) {
    // Crear formulario con validaciones básicas
    this.registrationForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      profileImage: [null], // Para almacenar la imagen cargada
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = new FormData();
      const formValue = this.registrationForm.value;

      // Verificar coincidencia de contraseñas
      if (formValue.password !== formValue.confirmPassword) {
        this.snackBar.open('Las contraseñas no coinciden', 'Cerrar', { duration: 3000 });
        return;
      }

      // Preparar los datos para el envío
      formData.append('name', formValue.fullName);
      formData.append('username', formValue.username);
      formData.append('password', formValue.password);
      if (formValue.profileImage) {
        formData.append('profile_image', formValue.profileImage);
      }

      // Llamar al servicio para registrar el usuario
      this.userService.registerUser(formData).subscribe({
        next: (response) => {
          this.snackBar.open('Usuario registrado con éxito', 'Cerrar', { duration: 3000 });
          this.dialogRef.close(response); // Cierra el modal con la respuesta
        },
        error: (error) => {
          console.error('Error al registrar usuario:', error);
          this.snackBar.open('Error al registrar usuario', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close(); // Cierra el modal sin guardar nada
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.registrationForm.patchValue({ profileImage: file });
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

}
