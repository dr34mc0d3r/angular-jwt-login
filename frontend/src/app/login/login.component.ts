import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {}

  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
  }

  loginUser (form: NgForm) {
    // console.log('form: ', form.form.value);
    this._auth.loginUser(form.form.value)
    .subscribe(
      res => {
        localStorage.setItem('id', res.id);
        localStorage.setItem('token', res.token);
        this._router.navigate(['/list-users']);
      },
      err => console.log(err)
    ) 
  }

}
