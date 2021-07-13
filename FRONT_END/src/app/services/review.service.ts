import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
      this.myAppUrl = environment.appUrl;
      this.myApiUrl = 'api/Reviews/';
  }

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getReview(id: number): Observable<Review> {
      return this.http.get<Review>(this.myAppUrl + this.myApiUrl + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getReviewMovie(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(this.myAppUrl + this.myApiUrl + "movie/" + id)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

   

  saveReview(review): Observable<Review> {
      return this.http.post<Review>(this.myAppUrl + this.myApiUrl, JSON.stringify(review), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateReview(id: number, review): Observable<Review> {
      return this.http.put<Review>(this.myAppUrl + this.myApiUrl + id, JSON.stringify(review), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteReview(id: number): Observable<Review> {
      return this.http.delete<Review>(this.myAppUrl + this.myApiUrl + id)
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
}