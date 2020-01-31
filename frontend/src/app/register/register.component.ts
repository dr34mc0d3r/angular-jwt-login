import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  registerUserData = {};
  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    console.warn(this.registerForm.value);
    this._auth.registerUser(this.registerForm.value)
    .subscribe(
      res => {
        console.log('res: ', res);
        localStorage.setItem('token', res.token)
        this._router.navigate(['/list-users'])
      },
      err => console.log(err)
    )      
  }

}
