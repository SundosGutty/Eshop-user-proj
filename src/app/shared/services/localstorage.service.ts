import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const TOKEN = 'jwtToken';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  private tokenSubject: BehaviorSubject<string | null>;

  constructor() {
    this.tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  }


  setToken(data: any) {
    localStorage.setItem(TOKEN, data);
    this.tokenSubject.next(data);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  removeToken() {
    localStorage.removeItem(TOKEN);
    this.tokenSubject.next(null);
  }
  getTokenObservable(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  isValidToken() {
  const token =  this.getToken();
  if (token) {
    const tokenDecode = JSON.parse(atob(token.split('.')[1]));
    return !this._tokenExpired(tokenDecode.exp);
  } else {
    return false;
  }
}

  getUserIdFromToken() {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecode) {
        return tokenDecode.userId;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  private _tokenExpired(expiration: any): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }

  
}
