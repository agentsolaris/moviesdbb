import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Soundtrack } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class SoundtrackService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
      this.myAppUrl = environment.appUrl;
      this.myApiUrl = 'api/Soundtracks/';
  }

  getSoundtracks(): Observable<Soundtrack[]> {
    return this.http.get<Soundtrack[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getSoundtrack(id: number): Observable<Soundtrack> {
      return this.http.get<Soundtrack>(this.myAppUrl + this.myApiUrl + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveSoundtrack(movie): Observable<Soundtrack> {
      return this.http.post<Soundtrack>(this.myAppUrl + this.myApiUrl, JSON.stringify(movie), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateSoundtrack(id: number, movie): Observable<Soundtrack> {
      return this.http.put<Soundtrack>(this.myAppUrl + this.myApiUrl + id, JSON.stringify(movie), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteSoundtrack(id: number): Observable<Soundtrack> {
      return this.http.delete<Soundtrack>(this.myAppUrl + this.myApiUrl + id)
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