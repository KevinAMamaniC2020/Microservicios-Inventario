import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UseregisterComponent } from './useregister/useregister.component';
import { UserserviceService } from '../services/userservice.service';


@Component({
  selector: 'app-listuser',
  standalone: false,
  
  templateUrl: './listuser.component.html',
  styleUrl: './listuser.component.css'
})
export class ListuserComponent {

  constructor(private dialog: MatDialog, private userService: UserserviceService) {}
  
  users: any[] = []; // Lista de usuarios
  pageSize = 6; // Tamaño de página
  currentPage = 0; // Página actual
  isLoading = false; // Indicador de carga
  errorMessage = ''; // Mensaje de error

  // Exponer Math en el contexto del componente
  Math = Math;

  ngOnInit(): void {
    this.loadUsers();
  }

   // Método para cargar usuarios desde el servicio
   loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar usuarios';
        console.error('Error:', error);
        this.isLoading = false;
      }
    });
  }

  get paginatedUsers() {
    const startIndex = this.currentPage * this.pageSize;
    return this.users.slice(startIndex, startIndex + this.pageSize);
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.users.length) {
      this.currentPage++;
    }
  }

  openRegistrationModal() {
    const dialogRef = this.dialog.open(UseregisterComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Usuario registrado:', result); // Aquí puedes actualizar la lista de usuarios
        this.loadUsers();
      }
    });
  }

}
