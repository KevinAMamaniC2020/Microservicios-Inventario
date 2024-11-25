import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListuserComponent } from './listuser/listuser.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'listuser', component: ListuserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
