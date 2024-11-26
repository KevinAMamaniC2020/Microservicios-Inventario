import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Importa FormsModule aquí
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListuserComponent } from './listuser/listuser.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UseregisterComponent } from './listuser/useregister/useregister.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InventarioComponent } from './inventario/inventario.component';
import { LayoutWithSidebarComponent } from './layout-with-sidebar/layout-with-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    ListuserComponent,
    LoginComponent,
    UseregisterComponent,
    SidebarComponent,
    InventarioComponent,
    LayoutWithSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,  // Asegúrate de que FormsModule esté en el array de imports
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule
  
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
