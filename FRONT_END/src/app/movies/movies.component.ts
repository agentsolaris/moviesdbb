import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';
import { HomeDetails } from '../models/home.details.interface'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../shared/services/user.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit ,OnDestroy{
  movies$: Observable<Movie[]>;
  response;
  homeDetails: HomeDetails;
  baseUrl: string = ''; 
  status: boolean;
  interceptor: boolean = false;
  subscription:Subscription;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  
  constructor(private http: HttpClient, private MovieService: MovieService,private userService:UserService, public loaderService: LoaderService) {
  }

  ngOnInit() {
    this.subscription = this.userService.authNavStatus$.subscribe(status => this.status = status);

    this.loadMovies();

  }
  reloadMovies(){
    if(this.interceptor){
    const url = "https://localhost:44378/api/movies";
    this.http.get(url).subscribe(r => (this.response = r));
    this.loadMovies();
    }
  }
  loadMovies() {
    
    this.movies$ = this.MovieService.getMovies();
    //this.homeDetails$ = this.MovieService.getHomeDetails();
    
   
   
    this.MovieService.getHomeDetails()
    .subscribe((homeDetails: HomeDetails) => {
      this.homeDetails = homeDetails;
    },
    error => {
      //this.notificationService.printErrorMessage(error);
    });
  }

  delete(id) {
    const ans = confirm('Do you want to delete movie with id: ' + id);
    if (ans) {
      this.MovieService.deleteMovie(id).subscribe((data) => {
        this.loadMovies();
      });
    }
  }


  
  logout() {
    this.userService.logout();
  }
  
  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }

}