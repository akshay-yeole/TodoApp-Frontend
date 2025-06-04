import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private storageService : StorageService, private router: Router, private toasterService : ToasterService) {}

  onLogin(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        this.storageService.setUserName(response.username);
        this.storageService.setToken(response.token);
        this.router.navigate(['/todos']);
      },
      error: () => {
        this.toasterService.errorToaster('Invalid credentials');
      }
    });
  }
}
