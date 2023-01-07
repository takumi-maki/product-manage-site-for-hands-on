import { User } from 'src/app/pages/models/user';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }
  //セッションストレージに保存
  static setItem<T>(key: string, content: T): void {
    sessionStorage.setItem(key, JSON.stringify(content));
  }
  
  //セッションストレージから取得
  static getItem<T>(key: string, t: T): T {
    return JSON.parse(sessionStorage.getItem(key)!) as T
  }

  //セッションストレージから削除
  static removeItem(key: string) {
    sessionStorage.removeItem(key);
  }
}