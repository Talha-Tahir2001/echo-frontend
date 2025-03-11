import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  http : HttpClient = inject(HttpClient);
  localStorageKey = 'echo_user';

  createUser(name:string){
    return this.http.post<User>(`${environment.PROD_BACKEND_URL}`, {
      name,
    });
  }

  saveUserToStorage(user:User){
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
  }
  getUserFromStorage(){
    const user = localStorage.getItem(this.localStorageKey);
    return user ? (JSON.parse(user) as User) : null;
  }
}
