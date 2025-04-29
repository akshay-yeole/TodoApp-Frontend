import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7299/api/Auth';
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  getToken(): string | null {
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Optionally: check if token is expired
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() / 1000 < payload.exp;
    } catch {
      return false;
    }
  }

  logout() {
    this.token = null;
    this.router.navigate(['/login']);
  }
}
