
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';



@Injectable({
    providedIn: 'root'
  })
export class ErrorInterceptor implements HttpInterceptor {
    request: HttpRequest<any>;
    constructor(private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.request = request;
        return next.handle(request).pipe(catchError(err => {
           // if (err instanceof HttpErrorResponse) {
            // if (this.request.url.indexOf('/api/login/beta/accessToken') < 0 && err.message.indexOf('oauth') < 0 && err.status === 401) {
            //    this.handleError(err, this.request.url)
              
            // } else if (err.status === 502 || err.status === 503 || err.status === 504)  {
            //     this.handleError(err)
            // } else if (err.status === 403)  {
            //    this.handleError(err);
               
            // } else if(err.status === 405) {
            //     this.handleError(err);
            // }
            this.handleError(err, this.request)
           
            const error = err.error.message || err.statusText;
            //console.log(error);
            return throwError(err);
        //}
        }));
    }

    handleError(err, reqUrl?){
    var me = this;
    
    if (reqUrl.url.indexOf('/api/login/beta/accessToken') < 0 && err.message.indexOf('oauth') < 0 && err.status === 401) {
    //  if(err.error.errorMessage){
      // Swal.fire({
      //   title: 'Error',
      //   text: "Session expired, Please login again.",
      //   type: 'error',
      //   showCancelButton: false,
      //   allowOutsideClick: false,
      //   confirmButtonColor: '#3085d6',
      //   cancelButtonColor: '#d33',
      //   confirmButtonText: 'Ok'
      // }).then((result) => {
        // console.log("on confirm")
        // setTimeout(() => {
          localStorage.clear();
          sessionStorage.clear();
          me.router.navigate(['/timeout']);
        // }, 3000);
        
      // })
    // }
     
   } else if (err.status === 502 || err.status === 503 || err.status === 504)  {
      localStorage.clear();
      me.router.navigate(['/badgateway']);
   } else if (err.status === 403)  {
    // localStorage.clear();
    // me.router.navigate(['/user']);
      
   } else if(err.status === 405) {
    Swal.fire({
      title: 'Error',
      text: "Method Not Allowed.",
      icon: 'error',
      showCancelButton: false,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    }).then((result) => {
      me.router.navigate(['']);
      localStorage.clear();
      
    })
   }      
    }
}
