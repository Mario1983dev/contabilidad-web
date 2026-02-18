import { Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login';
import { DashboardComponent } from './paginas/dashboard/dashboard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
