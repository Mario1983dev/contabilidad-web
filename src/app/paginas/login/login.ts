import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  remember = false;
  showPassword = false;
  error = '';
  status = '';
  year = new Date().getFullYear();

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.error = '';
    this.status = '';

    if (!this.username?.trim() || !this.password) {
      this.error = 'Debes ingresar usuario y contraseña.';
      return;
    }

    this.loading = true;

    this.http
      .post<any>('/api/auth/login', {
        username: this.username.trim(),
        password: this.password,
      })
      .subscribe({
        next: (resp) => {
          this.loading = false;
          this.status = 'Ingresando...';

          localStorage.setItem('token', resp?.accessToken || '');
          localStorage.setItem('user', JSON.stringify(resp?.user || {}));

          this.router.navigateByUrl('/dashboard');
        },
        error: (err) => {
          this.loading = false;
          this.status = '';

          if (err?.status === 401) {
            this.error = 'Credenciales inválidas.';
            return;
          }
          if (err?.status === 403) {
            this.error = 'Acceso no permitido.';
            return;
          }
          if (err?.status === 0) {
            this.error = 'No se pudo conectar con el servidor.';
            return;
          }

          this.error = 'Ocurrió un error inesperado. Inténtalo nuevamente.';
          console.log('LOGIN ERROR RAW:', err);
        },
      });
  }

  forgot() {
    alert('Función de recuperación aún no implementada.');
  }
}
