import { Component, Input, OnInit } from '@angular/core';
import { ToasterService } from './services/toaster.service';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  toasterMessages: string ='';
  userInfo: { name: string; token: string } = { name: '', token: '' };

  constructor(public toasterService: ToasterService, private storageService : StorageService, private router: Router) { }
  
  ngOnInit(): void {
    this.userInfo.name  = this.storageService.userName;
    this.userInfo.token = this.storageService.accessToken;
  }

  logout(): void {
    this.storageService.logout();
    this.router.navigate(['/login']);
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  @Input() title = '';
  @Input() message = '';
  @Input() type: 'success' | 'info' | 'warning' | 'danger' = 'info';
  @Input() show = true;

  get toastClass() {
    return {
      'alert-success': this.type === 'success',
      'alert-info': this.type === 'info',
      'alert-warning': this.type === 'warning',
      'alert-danger': this.type === 'danger',
      'border-start': true,
      'border-5': true,
      'shadow-sm': true,
      'p-3': true
    };
  }

  get iconClass() {
    switch (this.type) {
      case 'success': return 'bi bi-check-circle-fill text-success';
      case 'info': return 'bi bi-info-circle-fill text-info';
      case 'warning': return 'bi bi-exclamation-triangle-fill text-warning';
      case 'danger': return 'bi bi-x-circle-fill text-danger';
      default: return '';
    }
  }

  close() {
    this.show = false;
  }
}
