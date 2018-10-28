import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  // http options needed while sending post requests
  private httpOptions: any;

  // actual JWT token
  private token: string;

  // JWT token expiry date
  public tokenExpires: Date;

  // username of logged in user
  public username: string;

  // errors found when logging in
  public errors: any[] = [];

  constructor(private http: HttpClient) {
  	this.httpOptions = {
  		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  	}
  }

  login(user): void {
  	const loginUrl = '/api-token-auth/';

  	this.http.post(loginUrl, JSON.stringify(user), this.httpOptions)
  		.subscribe(data => this.updateData(data['token']));
  }

  updateData(token): void {
  	this.token = token;
  	this.errors = [];

  	const tokenParts = this.token.split(/\./);
  	const tokenDecoded = JSON.parse(window.atob(tokenParts[1]));
  	this.tokenExpires = new Date(tokenDecoded * 1000);
  	this.username = tokenDecoded.username;
  }

}
