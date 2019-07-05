import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ContentfulService } from './contentful.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentReslover implements Resolve<any> {

  constructor(private apiService: ContentfulService) {}

  resolve(): Observable<any> {
    return this.apiService.getUserSharedData();
  }
}
