import { Component, OnInit } from '@angular/core';
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
}
