import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  private usernameSubject = new BehaviorSubject<string | null>(null);

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  userRole$ = this.userRoleSubject.asObservable();
  username$ = this.usernameSubject.asObservable();

  private validUsers = [
    { username: 'user', password: 'password', role: 'user' },
    { username: 'admin', password: 'admin', role: 'admin' },
    { username: 'org', password: 'org', role: 'org' },
  ];

  constructor() {}

  login(username: string, password: string): boolean {
    const user = this.validUsers.find(u => u.username === username && u.password === password);
    
    if (user) {
      this.isAuthenticatedSubject.next(true);
      this.userRoleSubject.next(user.role);
      this.usernameSubject.next(user.username);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.userRoleSubject.next(null);
    this.usernameSubject.next(null);
  }

  // Devuelve el valor actual de isAuthenticated
  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.getValue();
  }

  // Devuelve el rol del usuario
  getUserRole(): string | null {
    return this.userRoleSubject.getValue();
  }

  // Devuelve el nombre del usuario
  getUsername(): string | null {
    return this.usernameSubject.getValue();  // Devuelve el valor actual del nombre de usuario
  }

}
