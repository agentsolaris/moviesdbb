import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';

import { UserRegistration } from '../models/user.registration.interface';
import { UserRegistrationDTO } from '../models/user.registrationDTO.interface';
import { ConfigService } from '../utils/config.service';

import {BaseService} from "./base.service";

import { Observable, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs/Rx'; 

// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators';
import { catchError, retry } from 'rxjs/operators';
@Injectable()
export class UserService extends BaseService {

  baseUrl: string = '';
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;

  constructor(private http: HttpClient, private configService: ConfigService) {
    super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = configService.getApiURI();
  }

    register(email: string, password: string, firstName: string, lastName: string,location: string): Observable<UserRegistration> {
    let body = JSON.stringify({ email, password, firstName, lastName,location });
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
     //.map(res => true)
      //.catch(this.handleError);
      console.log(body);
      console.log(this.baseUrl + "/accounts");
      console.log(this.httpOptions);
    return this.http.post<UserRegistration>(this.baseUrl + "/accounts", body, this.httpOptions)
      .pipe(
        retry(1)
      );
  }  


   login(userName, password) {
    let headers = this.httpOptions;

    return this.http
      .post<UserRegistrationDTO>(
      this.baseUrl + '/auth/login',
      JSON.stringify({ userName, password }),headers
      )
      .map(response => response)
      .map(response => {
        localStorage.setItem('auth_token', response.auth_token);
        this.loggedIn = true;
        this._authNavStatusSource.next(true);
        return true;
      })
      .catch(this.handleError);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // redirect to the login route
          // or show a modal
          console.log("testst");
        }
      }
    });
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  facebookLogin(accessToken:string) {
    let headers = this.httpOptions;
    let body = JSON.stringify({ accessToken });  
    return this.http
      .post<UserRegistrationDTO>(
      this.baseUrl + '/externalauth/facebook', body, headers )
      .map(response => response)
      .map(response => {
        localStorage.setItem('auth_token', response.auth_token);
        this.loggedIn = true;
        this._authNavStatusSource.next(true);
        return true;
      })
      .catch(this.handleError);
  }
}

