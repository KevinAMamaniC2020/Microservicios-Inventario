import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: false,
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(
    private authService: AuthService,  // Inyectamos AuthService
    private router: Router             // Inyectamos Router para redirigir
  ) {}

  onLogout() {
    this.authService.logout(); // Llamamos al método logout del AuthService
    this.router.navigate(['/login']); // Redirigimos al usuario a la página de login
  }

}
