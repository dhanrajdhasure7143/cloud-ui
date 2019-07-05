import { ContentfulConfig } from './../models/contentful-config';
import { Injectable, Inject } from '@angular/core';
import { ContentfulConfigService } from './contentful-config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

declare const contentful: any;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class ContentfulService {

  constructor(@Inject(ContentfulConfigService) private sharedconfig, private http: HttpClient) {
    this.initClient();
  }

  private initClient() {
    this.getUserSharedData();
  }

  public getUserSharedData(): Observable<any> {
    //const val = JSON.parse(localStorage.getItem('currentUser'));
    this.sharedconfig.loggedUser = localStorage.getItem('userName');

    // return this.http.post<any>('/rest/users/loggedUserDetails', { 'userName': val['username'], 'password': val['password'] }, httpOptions).pipe(take(1), map(data => {
    return this.http.get<any>('/rest/users/loggedUserDetails1').pipe(take(1), map(data => {
      this.sharedconfig.userSharedData = data;
      return this.sharedconfig;
    }));
  }

  success(data: any) {
    this.sharedconfig.userSharedData = data;
  }
}
