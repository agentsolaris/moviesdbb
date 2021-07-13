import { Component } from '@angular/core';

import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-facebook-login',
  templateUrl: './facebook-login.component.html',
  styleUrls: ['./facebook-login.component.scss']
})
export class FacebookLoginComponent {

  private authWindow: Window;
  failed: boolean;
  error: string;
  errorDescription: string;
  isRequesting: boolean; 

  launchFbLogin() {
    this.authWindow = window.open('https://www.facebook.com/v2.11/dialog/oauth?&response_type=token&display=popup&client_id=228600265403105&display=popup&redirect_uri=https://localhost:44378/test&scope=email',null,'width=600,height=400');    
  }

  constructor(private userService: UserService, private router: Router) {
    if (window.addEventListener) {
      window.addEventListener("message", this.handleMessage.bind(this), false);
    } else {
       (<any>window).attachEvent("onmessage", this.handleMessage.bind(this));
    } 
  } 

  handleMessage(event: Event) {
    //const message = event as MessageEvent;
    // var message = {"status":true,"accessToken":"EAADP6SWdauEBAAA17ysXiEQcQZCbwkuYmMKDUb0OpQJe4NtWZCZAHCijMY3RZCmajbUWQmFR2AZCdiZAsU8aepmRhVdh3RM9SZCQkuqPB4rSdF1Y2Wo6u4PxB091yaZBQrZAYpKFRgh5EiGu9hl9ZCTiDSgnyQyd5fUHiZCwS8YSDNVB6eJcYfZCzRy8qchTf9Iad4QZD","error":"","errorDescription":""};
    
    // console.log("fe");
    // // Only trust messages from the below origin.

    // //if (message.origin !== "https://localhost:44378") return;
    
    // //this.authWindow.close();
    // console.log(message);
    // //const result = JSON.parse(message.data);
    // const result = message;
    // //const result= 'OK';
    // if (!result.status)
    // {
    //   this.failed = true;
    //   this.error = result.error;
    //   this.errorDescription = result.errorDescription;
    // }
    // else
    // {
    //   this.failed = false;
    //   this.isRequesting = true;
      
    //   this.userService.facebookLogin(result.accessToken)
    //     .finally(() => this.isRequesting = false)
    //     .subscribe(
    //     result => {
    //       if (result) {
    //         this.router.navigate(['/movies']);
    //       }
    //     },
    //     error => {
    //       this.failed = true;
    //       this.error = error;
    //     });      
    // }
  }
}
