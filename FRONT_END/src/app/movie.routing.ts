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
import { CommonModule } from '@angular/common';

const routes: Routes = [

  { path: 'movies', component: MoviesComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'movies/:id', component: MovieComponent },
  { path: 'add', component: MovieAddEditComponent },
  { path: 'movies/edit/:id', component: MovieAddEditComponent },
];

@NgModule({
    
  imports: [RouterModule.forRoot(routes),  CommonModule ],
  exports: [RouterModule]
})
export class MovieRoutingModule { }