import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Review } from '../models/review';
import { UserService } from '../shared/services/user.service';





@Component({
  selector: 'app-facebook-auth',
  templateUrl: './facebook-auth.component.html',
  styleUrls: ['./facebook-auth.component.scss']
})
export class facebookAuthComponent {
  private authWindow: Window;
  failed: boolean;
  error: string;
  errorDescription: string;
  isRequesting: boolean; 
  descriptionPath : string = "facebook-auth.html";
projectDescription : string = "";
getParameterByName(name, url?) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&#]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  })
};

constructor(private http: HttpClient,private userService: UserService, private router: Router)
{ 
  
    
    console.log("teats");
      var accessToken = this.getParameterByName("access_token");
      console.log(accessToken);
      var message = {status: false, accessToken: "",error: "",errorDescription: ""};
      console.log(JSON.stringify(message));
      if (accessToken) {
        message.status = true;
        message.accessToken = accessToken;
      }
      else
      {
        message.status = false;
        message.error = this.getParameterByName("error");
        message.errorDescription = this.getParameterByName("error_description");
      }
      console.log(JSON.stringify(message));
      // this.http.post("https://localhost:44378/facebook-login", JSON.stringify(message), this.httpOptions)
      // .pipe(
      //   retry(1)
      // );
      const result = message;
    //const result= 'OK';
    if (!result.status)
    {
      this.failed = true;
      this.error = result.error;
      this.errorDescription = result.errorDescription;
    }
    else
    {
      this.failed = false;
      this.isRequesting = true;
      
      this.userService.facebookLogin(result.accessToken)
        .finally(() => this.isRequesting = false)
        .subscribe(
        result => {
          if (result) {
            this.router.navigate(['/movies']);
          }
        },
        error => {
          this.failed = true;
          this.error = error;
        });      
    }
  }
     // window.opener.postMessage(JSON.stringify(message), "https://localhost:44378");
}
