import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { Review } from '../models/review';

@Component({
  selector: 'app-review-add-edit',
  templateUrl: './review-add-edit.component.html',
  styleUrls: ['./review-add-edit.component.scss']
})
export class ReviewAddEditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formText: string;
  formStars: string;
  formMovieId: string;
  id: number;
  errorMessage: any;
  existingReview: Review;

  constructor(private reviewService: ReviewService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formText = 'text';
    this.formStars = 'stars';
    this.formMovieId = 'movieId';
    if (this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        id: 0,
        text: ['', [Validators.required]],
        stars: ['', [Validators.required]],
        movieId: ['', [Validators.required]],
      }
    )
  }

  ngOnInit() {
          this.form.controls[this.formMovieId].setValue(this.id)
     
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      
      let review: Review = {
        text: this.form.get(this.formText).value,
        stars: parseInt(this.form.get(this.formStars).value),
        movieId:  parseInt(this.form.get(this.formMovieId).value)
      };
      console.log(JSON.stringify(review));
      this.reviewService.saveReview(review)
        .subscribe((data) => {
          this.router.navigate(['/movies', review.movieId]);
        });
    }

    // if (this.actionType === 'Edit') {
    //   let review: Review = {
    //     id: this.existingReview.id,
    //     text: this.form.get(this.formText).value,
    //     stars: this.form.get(this.formStars).value,
    //     movieId: this.form.get(this.formMovieId).value
    //   };
    //   this.reviewService.updateReview(review.id, review)
    //     .subscribe((data) => {
    //       this.router.navigate([this.router.url]);
    //     });
    // }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get text() { return this.form.get(this.formText); }
  get stars() { return this.form.get(this.formStars); }
  get movieId() { return this.form.get(this.formMovieId); }
}