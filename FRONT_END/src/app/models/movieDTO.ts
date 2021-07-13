import { Actor } from "./actor";
import { Movie } from "./movie";
import { Soundtrack } from "./soundtrack";

export class MovieDTO {
    movie:Movie;
    actors?:Actor[];
    soundtrack?:Soundtrack;
  }