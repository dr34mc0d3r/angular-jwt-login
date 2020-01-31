import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _allUsersUrl = "http://photonic.ddns.net/lori1/api/users";
  private _editUrl = "http://photonic.ddns.net/lori1/api/users";
  private _userByIDUrl = 'http://photonic.ddns.net/lori1/api/users/'; // http://photonic.ddns.net/lori1/api/users/11

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any>(this._allUsersUrl);
  }

  editUser(user) {
    return this.http.patch<any>(this._editUrl, user);
  }

  getAccount(id) {
    return this.http.get<any>(this._userByIDUrl + id);
  }

}
