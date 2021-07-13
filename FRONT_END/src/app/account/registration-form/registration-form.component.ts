import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserRegistration } from '../../shared/models/user.registration.interface';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  errors: string;  
  isRequesting: boolean;
  submitted: boolean = false;

  constructor(private userService: UserService,private router: Router) { }

  ngOnInit() {
    
  }

  registerUser({ value, valid }: { value: UserRegistration, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
    if(valid)
    {
      console.log(value.email,value.password,value.firstName,value.lastName,value.location);
        this.userService.register(value.email,value.password,value.firstName,value.lastName,value.location)
                  .subscribe();
                  this.router.navigate(['/login']);
    }      
 } 

   

}
