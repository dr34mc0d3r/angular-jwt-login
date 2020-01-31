import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://photonic.ddns.net/lori1/api/users";
  private _loginUrl = "http://photonic.ddns.net/lori1/api/users/login";

  constructor(private http: HttpClient,
              private _router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user) {
    console.log('login: ',user);
    return this.http.post<any>(this._loginUrl, user);
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this._router.navigate(['/home']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getMyID() {
    return localStorage.getItem('id');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
}
