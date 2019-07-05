import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public httpclient: HttpClient;

  constructor(private injector: Injector) {
    this.httpclient = injector.get(HttpClient);
  }

}
