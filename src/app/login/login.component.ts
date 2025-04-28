import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response: any) => {
        this.authService.saveToken(response.token);
        const userProfile = { username : response?.username};
        this.router.navigate(['/todos']);
      },
      error: () => {
        this.errorMessage = 'Invalid credentials';
      }
    });
  }
}
