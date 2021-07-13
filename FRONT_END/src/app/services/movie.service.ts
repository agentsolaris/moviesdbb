import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';
import { HomeDetails } from '../models/home.details.interface';
import { UserService } from '../shared/services/user.service';
import { MovieDTO } from '../models/movieDTO';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  myAppUrl: string;
  myApiUrl: string;
  myDashUrl: string;
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  
  constructor(private http: HttpClient, private userService:UserService) {
      this.myAppUrl = environment.appUrl;
      this.myApiUrl = 'api/Movies/';
      this.myDashUrl = 'api/';
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getMovie(id: number): Observable<Movie> {
      return this.http.get<Movie>(this.myAppUrl + this.myApiUrl + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveMovie(movie): Observable<Movie> {
      return this.http.post<Movie>(this.myAppUrl + this.myApiUrl, JSON.stringify(movie), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateMovie(id: number, movie): Observable<MovieDTO> {
      return this.http.put<MovieDTO>(this.myAppUrl + this.myApiUrl + id, JSON.stringify(movie), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteMovie(id: number): Observable<Movie> {
      return this.http.delete<Movie>(this.myAppUrl + this.myApiUrl + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  getHomeDetails(): Observable<HomeDetails> {
      
    let authToken = localStorage.getItem('auth_token');
    this.httpOptions.headers = this.httpOptions.headers.append('Authorization', `Bearer ${authToken}`);
    let headers = this.httpOptions;
    console.log( headers);
  return this.http.get<HomeDetails>(this.myAppUrl + this.myDashUrl + "dashboard/home",headers)
    .map(response => response);
}

}