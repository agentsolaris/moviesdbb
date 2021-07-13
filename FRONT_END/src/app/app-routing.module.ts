import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';
import { MovieAddEditComponent } from './movie-add-edit/movie-add-edit.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewComponent } from './review/review.component';
import { ReviewAddEditComponent } from './review-add-edit/review-add-edit.component'
import { HomeComponent }  from './home/home.component';
import { RegistrationFormComponent } from './account/registration-form/registration-form.component';
import { LoginFormComponent } from './account/login-form/login-form.component';
import { FacebookLoginComponent } from './account/facebook-login/facebook-login.component';
import { AuthGuard } from './auth.guard';
import { LoaderComponent } from "./loader/loader.component";
import { CommonModule } from '@angular/common';
import { facebookAuthComponent } from './facebook-auth/facebook-auth.component';

const routes: Routes = [

  { path: 'movies', component: MoviesComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'movies/:id', component: MovieComponent },
  { path: 'add', component: MovieAddEditComponent },
  { path: 'movies/edit/:id', component: MovieAddEditComponent },
  { path: '', component: HomeComponent } ,
  { path: 'reviews', component: ReviewsComponent},
  { path: 'reviews/:id', component: ReviewComponent },
  { path: 'review/add/:id', component: ReviewAddEditComponent },
  { path: 'review/edit/:id', component: ReviewAddEditComponent },
  { path: 'reviews/movie/:id', component: ReviewsComponent},
  //{ path: '**', redirectTo: '/' },
  { path: 'register', component: RegistrationFormComponent},
  { path: 'login', component: LoginFormComponent},
  { path: 'facebook-login', component: FacebookLoginComponent},
  { path: 'loader',component: LoaderComponent},
  { path: 'test', component:facebookAuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }