import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';
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
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { httpInterceptorProviders } from './interceptors';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieComponent,
    MovieAddEditComponent,
    ReviewComponent,
    ReviewsComponent,
    ReviewAddEditComponent,
    HeaderComponent,
    HomeComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AccountModule,
    DashboardModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpModule,
    // AccountRoutingModule
  ],
  exports: [
    LoaderComponent
  ],
  providers: [
    httpInterceptorProviders,
    MovieService,
    AuthGuard,
    ConfigService, { 
      provide: XHRBackend, 
      useClass: AuthenticateXHRBackend
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }