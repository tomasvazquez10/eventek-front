import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const expectedRole = route.data["expectedRole"]; // Cambiado a notación de corchetes
    const isAuthenticated = this.authService.isAuthenticated; // Acceso directo
    const userRole = this.authService.getUserRole(); // Ahora debe funcionar

    if (!isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }

    if (expectedRole && userRole !== expectedRole) {
      this.router.navigate(['/not-authorized']); // O redirigir a una página de acceso denegado
      return false;
    }

    return true;
  }
}
