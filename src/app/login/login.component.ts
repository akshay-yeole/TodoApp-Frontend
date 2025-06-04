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
        if (!response || !response.username || !response.token) {
          this.toasterService.errorToaster('Invalid response from server');
          return;
        }
        this.storageService.userName = response.username;
        this.storageService.accessToken = response.token;
        this.router.navigate(['/todos']);
      },
      error: () => {
        this.toasterService.errorToaster('Invalid credentials');
      }
    });
  }
}
