import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; // Importamos Router y NavigationEnd

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  title = 'avancemicro';
  showSidebar: boolean = false; // Variable para controlar si mostrar el sidebar

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Escuchamos los eventos de navegación
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Verificamos si la ruta actual es '/login' o '/inventario' o '/list-user'
        // Cambiar el valor de showSidebar según la ruta
        this.showSidebar = event.url !== '/login' && (event.url.includes('/inventario') || event.url.includes('/list-user'));
      }
    });
  }
}
