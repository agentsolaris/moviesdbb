import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';
import { Actor } from '../models/actor';
import { MovieDTO } from '../models/movieDTO';
import { Soundtrack } from '../models/soundtrack';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-add-edit',
  templateUrl: './movie-add-edit.component.html',
  styleUrls: ['./movie-add-edit.component.scss']
})
export class MovieAddEditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formTitle: string;
  formReleaseDate: string;
  formRunningTime: string;
  formGenre: string;
  formPoster: string;
  id: number;
  errorMessage: any;
  existingMovie: Movie;
  formActor: FormGroup;
  actors: Actor[];
  soundtrack: Soundtrack;
  formSoundtrackName:string;
  formSoundtrackCreator:string;
  indexSelected = 0;

  constructor(private movieService: MovieService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formTitle = 'title';
    this.formReleaseDate = 'releaseDate';
    this.formRunningTime = 'runningTimeMins';
    this.formGenre = 'genre';
    this.formPoster = 'poster';
    this.formSoundtrackName = 'soundtrackName';
    this.formSoundtrackCreator = 'soundtrackCreator';

    if (this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        id: 0,
        title: ['', [Validators.required]],
        releaseDate: ['', [Validators.required]],
        runningTimeMins: ['', [Validators.required]],
        genre: ['', [Validators.required]],
        poster: ['', [Validators.required]],
        soundtrackName: ['', [Validators.required]],
        soundtrackCreator: ['', [Validators.required]]
      }
    )
  }

  ngOnInit() {
    this.formActor = new FormGroup( {
      'actors' : new FormArray([
        // Instantiate one
        new FormGroup({
          'name': new FormControl('')
        })
      ])
    });
    
    if (this.id > 0) {
      this.actionType = 'Edit';
      this.movieService.getMovie(this.id)
        .subscribe(data => (
          this.existingMovie = data,
          this.form.controls[this.formTitle].setValue(data.title),
          this.form.controls[this.formReleaseDate].setValue(data.releaseDate),
          this.form.controls[this.formRunningTime].setValue(data.runningTimeMins),
          this.form.controls[this.formGenre].setValue(data.genre),
          this.form.controls[this.formPoster].setValue(data.poster),
          this.form.controls[this.formSoundtrackName].setValue(data.soundtrack.name),
          this.form.controls[this.formSoundtrackCreator].setValue(data.soundtrack.creator)
        ));
    }
  }

  addActor() {
    (<FormArray>this.formActor.get('actors')).push(
      new FormGroup({
        'name': new FormControl('')
      })
    )
  }

  removeActor(index: number) {
    (<FormArray>this.formActor.get('actors')).removeAt(index);
  }

  onSubmit() {
    console.log( (<FormArray>this.formActor.get('actors')).at(this.indexSelected).value);
    console.log( (<FormArray>this.formActor.get('actors')).value);
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      let movie:Movie ={
        title: this.form.get(this.formTitle).value,
        releaseDate: parseInt(this.form.get(this.formReleaseDate).value),
        runningTimeMins: parseInt(this.form.get(this.formRunningTime).value),
        genre: this.form.get(this.formGenre).value,
        poster: this.form.get(this.formPoster).value,
      }
      let soundtrack:Soundtrack={
        name: this.form.get(this.formSoundtrackName).value,
        creator: this.form.get(this.formSoundtrackCreator).value,
      }
      console.log(soundtrack.name);
      let movieDTO:MovieDTO={
        movie:movie,
        soundtrack:soundtrack
      }
      this.actors = new Array <Actor>() ;
      for (let i =0;i<  ((<FormArray>this.formActor.get('actors')).length) ;i++) {
        const element = (<FormArray>this.formActor.get('actors')).at(i);
        if (element.valid) {
            //this.actors.push({name: element.value});
            this.actors.push({name: element.value["name"]});
            
        }
    }
    movieDTO.actors = this.actors;
      console.log(JSON.stringify(movieDTO));
      this.movieService.saveMovie(movieDTO)
        .subscribe((data) => {
          this.router.navigate(['/movies', data.id]);
        });
    }

    if (this.actionType === 'Edit') {
      console.log("edit");
      let movie: Movie = {
        id: this.existingMovie.id,
        title: this.form.get(this.formTitle).value,
        releaseDate: this.form.get(this.formReleaseDate).value,
        runningTimeMins: this.form.get(this.formRunningTime).value,
        genre: this.form.get(this.formGenre).value,
        poster: this.form.get(this.formPoster).value,
      };
      let soundtrack:Soundtrack={
        name: this.form.get(this.formSoundtrackName).value,
        creator: this.form.get(this.formSoundtrackCreator).value,
      }
      let movieDTO:MovieDTO={
        movie:movie,
        soundtrack:soundtrack
      }
      
      this.actors = new Array <Actor>() ;
      for (let i =0;i<  ((<FormArray>this.formActor.get('actors')).length) ;i++) {
        const element = (<FormArray>this.formActor.get('actors')).at(i);
        if (element.valid) {
            //this.actors.push({name: element.value});
            this.actors.push({name: element.value["name"]});
            
        }
      }
      movieDTO.actors = this.actors;
      console.log(JSON.stringify(movieDTO));
      console.log("movie.id: " + movie.id + " " + "moviDTO.id: "+ movieDTO.movie.id)
      this.movieService.updateMovie(movie.id, movieDTO)
        .subscribe((data) => {
          this.router.navigate(['/movies']);
        });
    }
  }

  cancel() {
    this.router.navigate(['/movies']);
  }

  get title() { return this.form.get(this.formTitle); }
  get releaseDate() { return this.form.get(this.formReleaseDate); }
  get runningTimeMins() { return this.form.get(this.formRunningTime); }
  get genre() { return this.form.get(this.formGenre); }
  get poster() { return this.form.get(this.formPoster); }
}