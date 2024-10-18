import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';  // Asegúrate de importar tu AuthService

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  userName: string | null = null;  // Almacena el nombre del usuario

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.userName = this.authService.getUsername();  // Obtén el nombre del usuario desde el servicio
      } else {
        this.userName = null;
      }
    });
  }

  // Método para redirigir al login
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
    this.userName = null; // Limpia el nombre de usuario al cerrar sesión
  }
}
