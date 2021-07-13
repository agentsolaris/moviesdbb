import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { HomeDetails } from '../models/home.details.interface'; 
import { ConfigService } from '../../shared/utils/config.service';

import {BaseService} from '../../shared/services/base.service';

import { Observable } from 'rxjs/Rx'; 

// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class DashboardService extends BaseService {

  baseUrl: string = ''; 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient, private configService: ConfigService) {
     super();
     this.baseUrl = configService.getApiURI();
  }

  getHomeDetails(): Observable<HomeDetails> {
      
      let authToken = localStorage.getItem('auth_token');
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', `Bearer ${authToken}`);
      let headers = this.httpOptions;
      //console.log( headers);
    return this.http.get<HomeDetails>(this.baseUrl + "/dashboard/home",headers)
      .map(response => response)
      .catch(this.handleError);
  }  
}
