import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ToasterService } from './services/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  toasterMessages: string ='';

  constructor(public toasterService: ToasterService, private authService: AuthService, private router: Router) { }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
