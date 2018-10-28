import { Component, OnInit } from '@angular/core';

import { UserService } from '../core/user.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService) { }

  // object represents the user for the login form
  public user: User;

  ngOnInit() {
  	this.user = {
  		username: '',
  		password: '',
  	}
  }

  login(): void {
  	this.userService.login(
  		{ 'username': this.user.username, 'password': this.user.password }
  	);
  }

  refreshToken(): void {
  	this.userService.refreshToken();
  }

  logout(): void {
  	this.userService.logout();
  }

}
