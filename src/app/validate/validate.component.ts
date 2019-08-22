import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { APP_CONFIG } from './../app.config';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss']
})
export class ValidateComponent implements OnInit {

  constructor(@Inject(APP_CONFIG) private config, private aroute: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService, private http: HttpClient, private route: Router) { }

  ngOnInit() {
    this.spinnerService.show();
    localStorage.clear();
    sessionStorage.clear();
    if (this.aroute.snapshot.paramMap.get('token')) {
      const token = this.aroute.snapshot.paramMap.get('token');
      this.http.get<any>(`/api/user/registrationConfirm?token=${token}`).subscribe(res => {
        this.spinnerService.hide();
        this.route.navigate(['/home']);
      }, err => {
        this.spinnerService.hide();
        Swal.fire({
          title: 'Error !!',
          type: 'error',
          text: `Link expired, Please contact support team !!`,
          allowOutsideClick: false
        }).then((result) => {
          if (result.value) {
            location.href = this.config.portfolioSite;
          }
        });
      });
    }
  }
}
