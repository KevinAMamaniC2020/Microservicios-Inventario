import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UseregisterComponent } from './useregister/useregister.component';


@Component({
  selector: 'app-listuser',
  standalone: false,
  
  templateUrl: './listuser.component.html',
  styleUrl: './listuser.component.css'
})
export class ListuserComponent {

  constructor(private dialog: MatDialog) {}
  
  users = [
    { fullName: 'Christian Ziegler Pacori Paucar', email: 'cpacori@unsa.edu.pe', nickname: 'Steven' },
    { fullName: 'Josue Daniel Huashuayo Sivincha', email: 'jhuashuayo@unsa.edu.pe', nickname: 'Chema' },
    { fullName: 'Juan Pedro Vidal Pastor Pastor', email: 'jpastorp@unsa.edu.pe', nickname: 'Juancho' },
    { fullName: 'Jhon Yosef Luna Quispe', email: 'jlunaq@unsa.edu.pe', nickname: 'Jhonny Boy' },
    { fullName: 'Kevin Alonso Mamani Condori', email: 'kmamanicondo@unsa.edu.pe', nickname: 'Kev' },
    { fullName: 'Carlos Perez Soto', email: 'cperez@unsa.edu.pe', nickname: 'Carlitos' },
    { fullName: 'Ana Maria Lopez', email: 'alopez@unsa.edu.pe', nickname: 'Anita' },
    { fullName: 'Miguel Ángel Torres', email: 'mtorres@unsa.edu.pe', nickname: 'Mike' },
    { fullName: 'Lucía Fernández Paredes', email: 'lfernandez@unsa.edu.pe', nickname: 'Luci' }
  ];

  pageSize = 6;
  currentPage = 0;

  // Exponer Math en el contexto del componente
  Math = Math;

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
      }
    });
  }

}
