import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
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
  userInfo: { name?: string; token?: string } = { name: '', token: '' };

  constructor(public toasterService: ToasterService, private storageService : StorageService, private router: Router) { }
  
  ngOnInit(): void {
    this.userInfo.name  = this.storageService.getUserName();
    this.userInfo.token = this.storageService.getToken();
  }

  logout(): void {
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
