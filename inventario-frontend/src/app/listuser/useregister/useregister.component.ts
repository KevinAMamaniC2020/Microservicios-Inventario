import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

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
    private dialogRef: MatDialogRef<UseregisterComponent>
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
      const formData = this.registrationForm.value;
      console.log('Datos del usuario:', formData); // Puedes enviar esto al backend
      this.dialogRef.close(formData);
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
