import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7299/api/Auth';
  private token: string | null = null;

  constructor(private http: HttpClient, private storageService : StorageService, private router: Router) {}

  isAuthorized(): boolean {
    return !! this.storageService.accessToken;
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }


  logout() {
    this.token = null;
    this.router.navigate(['/login']);
  }

}
