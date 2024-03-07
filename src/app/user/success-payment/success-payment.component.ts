import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { FirstloginService } from 'src/app/firstlogin/@providers/firstlogin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-success-payment',
  templateUrl: './success-payment.component.html',
  styleUrls: ['./success-payment.component.scss']
})
export class SuccessPaymentComponent implements OnInit {
 public countdown: number = 30;

  constructor(
    private route: ActivatedRoute, 
    private rest_api: FirstloginService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.subscriptionComplete();
  }

  subscriptionComplete(){
    this.route.queryParams.subscribe(data => {
      console.log("USER_EMAIL",data);
      const userEmail = data.id
      if (userEmail) {
        this.rest_api.registrationComplete(userEmail).subscribe((response:any) => {
          console.log("registrationComplete",response);
        let userEmail = response.userEmail;
        let tenantId = response.tenantId;
          this.rest_api.insertCustomerSubscription(userEmail, tenantId).subscribe((subscriptionResponse:any) => {
            if(subscriptionResponse.messege == "Customer details and subscriptions are inserted In DB Successfully"){
              // Swal.fire({
              //   title: 'Success!',
              //   text: `Your subscription is successful, Please re-login!`,
              //   icon: 'success',
              //   showCancelButton: false,
              //   allowOutsideClick: false,
              // }).then((result) => {
              //   if (result.isConfirmed) {
              //     this.router.navigate((['/user']));
              //   }
              // });
              this.startCountdown();
            }else{
              Swal.fire({
                title: 'Error!',
                text: "Something went wrong!",
                icon: 'error',
                showCancelButton: false,
                allowOutsideClick: false,
              })
            }
          }, subscriptionError => {
              Swal.fire("Error","Something went wrong!","error")
          });
        }, error => {
            Swal.fire("Error","Something went wrong!","error")
        });
      }
    });
  }

  startCountdown(){
    interval(1000).pipe(
      take(this.countdown)
    ).subscribe(() => {
      this.countdown--;
      if (this.countdown === 0) {
        this.router.navigate(['/user']);
      }
    });
  }
}
