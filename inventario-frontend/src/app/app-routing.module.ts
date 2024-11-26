import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListuserComponent } from './listuser/listuser.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InventarioComponent } from './inventario/inventario.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'listuser', component: ListuserComponent },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'inventario', component: InventarioComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
