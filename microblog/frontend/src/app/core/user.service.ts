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



}
