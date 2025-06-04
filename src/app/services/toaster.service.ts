import { Injectable } from '@angular/core';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  messages: Array<{type?: number, message: string}> = [];
  
  constructor() { }

  async successToaster(value: string, time: number = 3000) {
    this.messages.push({ message : value });
    await timer(time).toPromise();
    this.messages.shift();
  }

  async errorToaster(value: string, time: number = 3000) {
    this.messages.push({ type:1, message : value });
    await timer(time).toPromise();
    this.messages.shift();
  }

  removeMessage(index: number): void {
    this.messages.splice(index, 1);
  }
}
