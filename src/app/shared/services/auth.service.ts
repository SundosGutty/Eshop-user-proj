import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { LocalstorageService } from './localstorage.service';
import { Store } from '@ngrx/store';
import * as UsersActions from '../state/users.actions'
import { CartService } from './cart.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURLUsers = environment.apiUrl + 'users';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalstorageService,
    private store: Store,
    private cartService: CartService
  ) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiURLUsers}/login`, { email, password }).pipe(
      tap(user => {
        this.store.dispatch(UsersActions.buildUserSession());
      })
    );
  }

  logout() {
    this.localStorageService.removeToken();
    this.cartService.emptyCart()
  }
}
