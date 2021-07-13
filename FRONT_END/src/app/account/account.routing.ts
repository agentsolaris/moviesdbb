import { ModuleWithProviders } from '@angular/core';
import { Routes,RouterModule }        from '@angular/router';

import { RegistrationFormComponent }    from './registration-form/registration-form.component';
import { LoginFormComponent }    from './login-form/login-form.component';
import { FacebookLoginComponent }    from './facebook-login/facebook-login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
      ngModule: Type<T>;
      providers?: Provider[];
  }
}

const routes: Routes = [
  { path: 'register', component: RegistrationFormComponent},
  { path: 'login', component: LoginFormComponent},
//   { path: 'facebook-login', component: FacebookLoginComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
// export const routing: ModuleWithProviders = RouterModule.forChild([
//   
// ]);