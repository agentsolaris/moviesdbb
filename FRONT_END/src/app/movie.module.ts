import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MovieRoutingModule } from './Movie-routing.module';
import { MoviesComponent } from './movies/movies.component';
import { MovieAddEditComponent } from './movie-add-edit/movie-add-edit.component';
import { MovieService } from './services/movie.service';
import { ReviewComponent } from './review/review.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewAddEditComponent } from './review-add-edit/review-add-edit.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AccountModule }  from './account/account.module';
import { DashboardModule }  from './dashboard/dashboard.module';
import { ConfigService } from './shared/utils/config.service';
// import { AccountRoutingModule } from './account/account.routing';
import { HttpModule, XHRBackend } from '@angular/http';
import { AuthenticateXHRBackend } from './authenticate-xhr.backend';
import { AuthGuard } from './auth.guard';
import { MovieComponent } from './movie/movie.component';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
   MoviesComponent,
  MovieComponent,
  MovieAddEditComponent,
    MovieAddEditComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MovieRoutingModule,
    ReactiveFormsModule,
    AccountModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule
    // AccountRoutingModule
  ],
  providers: [
    MovieService,
    AuthGuard,
    ConfigService, { 
      provide: XHRBackend, 
      useClass: AuthenticateXHRBackend
    }
  ],
  bootstrap: [MovieComponent]
})
export class MovieModule { }