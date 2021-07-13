import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LoaderService {
  showLoader = false;

  constructor() {}

  show() {
    console.log("show");
    this.showLoader = true;
  }

  hide() {
    console.log("hide");
    this.showLoader = false;
  }
}
