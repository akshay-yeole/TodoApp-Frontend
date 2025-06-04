import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private static KEY_USER_NAME = 'userName';
  private static KEY_TOKEN = 'token';

  getUserName(): string  {
    return localStorage.getItem(StorageService.KEY_USER_NAME) ?? '';
  }

  setUserName(userName: string): void {
    localStorage.setItem(StorageService.KEY_USER_NAME, userName);
  }

  getToken(): string {
    return localStorage.getItem(StorageService.KEY_TOKEN) ?? '';
  }
  
  setToken(token: string): void {
    localStorage.setItem(StorageService.KEY_TOKEN, token);
  }
}
