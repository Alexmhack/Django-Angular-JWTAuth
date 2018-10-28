import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../shared/user';

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

  login(user) {
  	const loginUrl = '/api-token-auth/';

  	return this.http.post(loginUrl, JSON.stringify(user), this.httpOptions)
  		.subscribe(
  			data => {
	  			this.updateData(data['token'])
	  		},
	  		err => {
	  			this.errors = err['error'];
	  		}
  		)
  }

  refreshToken() {
  	const refreshUrl = '/api-token-refresh/';
  	this.http.post(refreshUrl, JSON.stringify({token: this.token}), this.httpOptions)
  		.subscribe(
  			data => {
  				this.updateData(data['token']);
  			},
  			err => {
  				this.errors = err['error'];
  			}
  		)
  }

  logout() {
  	this.token = null;
  	this.tokenExpires = null;
  	this.username = null;
  }

  updateData(token): void {
  	this.token = token;
  	this.errors = [];

  	const tokenParts = this.token.split(/\./);
  	const tokenDecoded = JSON.parse(window.atob(tokenParts[1]));
  	console.log(tokenDecoded);
  	
  	this.tokenExpires = new Date(tokenDecoded * 1000);
  	this.username = tokenDecoded.username;
  }

 /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }  

}
