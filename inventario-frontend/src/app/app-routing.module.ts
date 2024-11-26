import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListuserComponent } from './listuser/listuser.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InventarioComponent } from './inventario/inventario.component';
import { AuthGuard } from './auth.guard';  // Importa el guard
import { LayoutWithSidebarComponent } from './layout-with-sidebar/layout-with-sidebar.component'; // Importa el layout


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'inventario', component: InventarioComponent  },  // Ruta protegida
  { path: 'list-user', component: ListuserComponent },
  { path: 'layout-with-sidebar', component: LayoutWithSidebarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
