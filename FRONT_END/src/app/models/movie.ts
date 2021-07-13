import { Actor } from "./actor";
import { MoviesActors } from "./moviesactors";
import { Review } from "./review";
import { Soundtrack } from "./soundtrack";

export class Movie {
    id?: number;
    title: string;
    releaseDate: number;
    runningTimeMins: number;
    genre: string;
    poster: string;
    soundtrack?: Soundtrack;
    moviesActors?: MoviesActors[];
    reviews?: Review[];
  }