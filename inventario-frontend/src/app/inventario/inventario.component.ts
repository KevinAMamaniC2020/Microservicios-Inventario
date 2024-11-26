import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventario',
  standalone: false,
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent {
  searchTerm: string = '';
  
  // Formulario reactivo
  registroForm: FormGroup;

  // Datos iniciales de los productos
  items = [
    {
      nombre: 'Lápiz',
      descripcion: 'Lápiz de grafito HB',
      cantidad: 100,
      precioUnitario: 0.5,
      categorias: ['Oficina', 'Escritura'],
    },
    {
      nombre: 'Cuaderno',
      descripcion: 'Cuaderno A4 100 hojas',
      cantidad: 50,
      precioUnitario: 2.5,
      categorias: ['Oficina', 'Papelería'],
    },
    {
      nombre: 'Tijeras',
      descripcion: 'Tijeras de acero inoxidable',
      cantidad: 30,
      precioUnitario: 1.2,
      categorias: ['Oficina', 'Corte'],
    },
  ];

  filteredItems = [...this.items]; // Copia inicial para filtrado

  // Método para filtrar los elementos
  filterItems() {
    this.filteredItems = this.items.filter((item) =>
      item.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.categorias.some((cat) =>
        cat.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  constructor(private fb: FormBuilder) {
    // Crear el formulario con los controles
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      precioUnitario: ['', [Validators.required, Validators.min(0)]]
    });
  }

  // Método para registrar el producto
  registrarProducto() {
    if (this.registroForm.valid) {
      const newProduct = this.registroForm.value;
      this.items.push(newProduct);
      this.filteredItems.push(newProduct);
      console.log('Producto registrado:', newProduct);
      this.registroForm.reset(); // Limpiar el formulario
    } else {
      console.log('Formulario no válido');
    }
  }

  // Método para cancelar el registro
  cancelarRegistro() {
    this.registroForm.reset(); // Limpiar el formulario
  }
}
