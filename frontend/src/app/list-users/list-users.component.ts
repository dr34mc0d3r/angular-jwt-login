import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users:any = [];

  constructor(private _userService: UserService,
              private _router: Router) { }


  ngOnInit() {
    this._userService.getUsers()
      .subscribe(
        res => {
          // console.log('res',res);
          if(res.success == 1) {
            this.users = res;
          } else {
            this._router.navigate(['/login']);
          }
        },
        err => {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._router.navigate(['/login']);
            }
          }
        }
      );
  }

}
