import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './auth.guard';
import { LoginComponent } from './paginas/login/login';
import { DashboardComponent } from './paginas/dashboard/dashboard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];
