import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../services/product.service';
import { ReportService } from '../report.service';

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
  

  // Lista de productos
  items: Product[] = [];
  filteredItems: Product[] = []; // Copia inicial para filtrado

  constructor(
    private fb: FormBuilder,
    private productService: ProductService, // Inyecta el servicio
    private reportService: ReportService
  ) {
    // Crear el formulario con los controles
    this.registroForm = this.fb.group({
      code: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', [Validators.required]]
    });

    // Cargar los productos al inicializar el componente
    this.loadProducts();
  }
  

  // Método para cargar productos desde el servidor
  loadProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.items = data;
        this.filteredItems = [...this.items]; // Copia inicial para filtrado
      },
      (error) => {
        console.error('Error al cargar los productos', error);
      }
    );
  }

  // Método para filtrar los elementos
  filterItems() {
    this.filteredItems = this.items.filter((item) =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Método para registrar un nuevo producto
  registrarProducto() {
    if (this.registroForm.valid) {
      const newProduct: Product = this.registroForm.value;
      
      // Verificar si el nombre ya existe en la lista de productos
      const isNameDuplicate = this.items.some(item => item.name.toLowerCase() === newProduct.name.toLowerCase());
  
      if (isNameDuplicate) {
        console.log('El nombre del producto ya existe.');
        alert('El nombre del producto ya existe. Por favor, ingrese un nombre diferente.');
        return; // Salir de la función si el nombre está duplicado
      }
  
      // Si el nombre no está duplicado, proceder con la creación del producto
      this.productService.addProduct(newProduct).subscribe(
        (product) => {
          this.items.push(product);  // Agregar el producto a la lista
          this.filteredItems.push(product);  // Agregar el producto a la lista filtrada
          console.log('Producto registrado:', product);
          this.registroForm.reset(); // Limpiar el formulario
        },
        (error) => {
          console.error('Error al registrar el producto', error);
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
  

  // Método para cancelar el registro
  cancelarRegistro() {
    this.registroForm.reset(); // Limpiar el formulario
  }

  // Método para eliminar un producto
  eliminarProducto(code: string) {
    this.productService.deleteProduct(code).subscribe(
      () => {
        // Eliminar el producto de la lista local
        this.items = this.items.filter(product => product.code !== code);
        this.filteredItems = this.filteredItems.filter(product => product.code !== code);
        console.log(`Producto con código ${code} eliminado.`);
      },
      (error) => {
        console.error('Error al eliminar el producto', error);
      }
    );
  }

  exportToPdf() {
    this.reportService.downloadPdf().subscribe(
      (response: Blob) => {
        // Crear un enlace para descargar el archivo
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reporte.pdf'; // Nombre del archivo que se descargará
        a.click();
        window.URL.revokeObjectURL(url); // Limpiar el objeto URL después de la descarga
      },
      (error) => {
        console.error('Error al descargar el PDF', error);
      }
    );
  }
}
