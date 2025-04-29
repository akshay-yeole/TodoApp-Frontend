import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private toasterService : ToasterService) {}

  onLogin(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response: any) => {
        this.authService.setToken(response.token);
        this.router.navigate(['/todos']);
      },
      error: () => {
        this.toasterService.errorToaster('Invalid credentials');
      }
    });
  }
}
