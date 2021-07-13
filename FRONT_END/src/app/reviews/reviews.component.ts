import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewService } from '../services/review.service';
import { Review } from '../models/review';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  reviews$: Observable<Review[]>;

  constructor(private ReviewService: ReviewService) {
  }

  ngOnInit() {
    this.loadReviews();
    
  }

  loadReviews() {
    this.reviews$ = this.ReviewService.getReviewMovie(3);
    
  }

  delete(id) {
    const ans = confirm('Do you want to delete review with id: ' + id);
    if (ans) {
      this.ReviewService.deleteReview(id).subscribe((data) => {
        this.loadReviews();
      });
    }
  }

  
}