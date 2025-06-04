import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Adjust the path as necessary
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  
  constructor(private storageService : StorageService, private router: Router) {}

  canActivate(): boolean {
    const isoggedIn = this.storageService.accessToken ? true : false;
    
    if (isoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
