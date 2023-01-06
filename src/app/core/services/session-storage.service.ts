import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }
  static setItem<T>(key: string, content: T): void {
    sessionStorage.setItem(key, JSON.stringify(content));
  }
  
  static getItem<T>(key: string, t: T): T {
    return JSON.parse(sessionStorage.getItem(key)!) as T
  }

  static removeItem(key: string) {
    sessionStorage.removeItem(key);
  }
}
