import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  editForm = new FormGroup({
    id: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });


  id: number;

  constructor(private _userService: UserService,
    private _router: Router,
    private _ActivatedRoute: ActivatedRoute) {

    const id: Observable<string> = _ActivatedRoute.params.pipe(map(p => p.id));

  }

  editUser() {
    console.log(this.editForm.value);
    this._userService.editUser(this.editForm.value)
      .subscribe(
        res => {
          console.log('res: ', res);
          localStorage.setItem('token', res.token)
          this._router.navigate(['/list-users'])
        },
        err => console.log(err)
      )
  }


  ngOnInit() {
    this._ActivatedRoute.params.subscribe(routeParams => {
      // console.log(routeParams.id);
      this.getUser(routeParams.id);
    });
  }

  getUser(id) {
    console.log(id);
    this._userService.getAccount(id)
      .subscribe(
        res => {
          // console.log(res.success);
          if (res.success == 0) {
            this._router.navigate(['/login']);
          } else {
            console.log(res.data);
            this.editForm.patchValue(res.data);
            // this.editForm = res.data;
          }
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login']);
            }
          }
        }
      )
  }

}
