import { ForgotpasswordService } from './../_services/forgotpassword.service';
import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_CONFIG } from './../../app.config';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// import 'particles.js/particles';
import * as particlesJS from 'particlesjs';

declare var particlesJS :any;

@Component({ templateUrl: 'forgotpassword.component.html',
styleUrls: ['forgotpassword.component.scss'],
})

export class ForgotpasswordComponent implements OnInit {
  emailForm: FormGroup;
  submitted = false;
  error;

  constructor(@Inject(APP_CONFIG) private config, private router: Router, private formBuilder: FormBuilder,  private forgotpasswordser: ForgotpasswordService) { }

  ngOnInit() {
    this.particle();
      this.emailForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
      });
  }

  get f() { return this.emailForm.controls; }

  onSubmit() {
          this.submitted = true;
      if (this.emailForm.invalid) {
          return;
      }
      this.forgotpasswordser.forgotPassword({email: this.f.email.value}).subscribe(res => {
        console.log(res);
        if(res.message ==='Password reset mail sent successfully'){
          Swal.fire({
            title: 'Success!',
            text: `Reset password link has been sent to your email successfully.`,
            type: 'success',
            
           
            // showConfirmButton: true,
            
          }).then(()=>{
           this.router.navigate(['/user'])
          })
        } else {
          Swal.fire({
            type: 'error',
            title:"Error!",
            text: "User Not Found."
            
            
          });
        }

       
      
      //  alert('reset password link is sent to your mail  !')
       
        });

    //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.emailForm.value))
  }

  onSignup() {
    localStorage.clear();
    sessionStorage.clear();
    location.href = this.config.portfolioSite;
  }
  particle(){
    particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 200,
          "density": {
            "enable": true,
            "value_area": 650
          }
        },
        "color": {
          "value": "#d3dbd4"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 1,
            "color": "#d3dbd4"
          },
          "polygon": {
            "nb_sides": 5
          },

        },
        "opacity": {
            "value": 1,
            "random": false,
            "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
            "value": 7,
            "random": true,
            "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.3,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#d3dbd4",
          "opacity": 0.6,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 6,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 600
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
        },
        "modes": {
          "grab": {
            "distance": 120,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 80,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });

  }
}
