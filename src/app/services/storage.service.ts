import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private static KEY_USER_NAME = 'userName';
  private static KEY_ACCESS_TOKEN = 'accessToken';

  get userName() {
    return localStorage.getItem(StorageService.KEY_USER_NAME) ?? '';
  }

  set userName(value: string) {
    localStorage.setItem(StorageService.KEY_USER_NAME, value);
  }

  get accessToken() {
    return localStorage.getItem(StorageService.KEY_ACCESS_TOKEN) ?? '';
  }

  set accessToken(value: string) {
    localStorage.setItem(StorageService.KEY_ACCESS_TOKEN, value);
  }

  logout() {
    localStorage.removeItem(StorageService.KEY_USER_NAME);
    localStorage.removeItem(StorageService.KEY_ACCESS_TOKEN);
  }
}
