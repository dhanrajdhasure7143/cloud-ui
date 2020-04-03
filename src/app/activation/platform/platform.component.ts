import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductlistService } from 'src/app/_services/productlist.service';
import { UserService } from 'src/app/_services';
// import 'particles.js/particles';
import * as particlesJS from 'particlesjs';

declare var particlesJS :any
@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {
  productslist: any[] = [];
  email: string;
  tenantId: string;
  dbValue: any = [];
  subscribedProd: boolean=false;
  selectedData:any[];
  constructor(private router: Router,private productlistservice:ProductlistService,public userService: UserService) { }

  // ngOnInit() {
  //   this.productlistservice.getAllProducts().subscribe(data => {this.productslist = data
  //     console.log("products",data)    
  //   });
    
  //   this.tenantId = localStorage.getItem("tenantName");
  //   this.email = localStorage.getItem("userName");
  //   console.log("apps subscribed", this.tenantId, this.email);
  //   this.userService.getUserApplications(this.tenantId, this.email).subscribe(data => this.successGetApps(data));
  // }
  // successGetApps(data) {
  //   console.log("appname", data);
  //   if(data.appname=="Ezbot")
  //   {
  //     this.subscribedProd=true;
  //     console.log("subscribed?", this.subscribedProd);
  //   }
  //   data.forEach(element => {
  //     this.dbValue.push(element)
  //   });

  // }
  // SuccessCallback(data: any[]) {
  //   this.productslist=data;
  //   console.log("products are   ---------",this.productslist)
  // }
  // setProductPlan(plans){
  //   this.productlistservice.setSelectedProductPlan(plans);
  //   this.router.navigate(['/activation/payment/chooseplan']);
  // }

  // productTrackBy(index, item){
  //   return index;
  // }
  dataArr:any[];
  selectedIndex: number=0;

  ngOnInit() {
    // this.dt.changeParentModule(undefined);
    // this.dt.changeChildModule(undefined);
    this.dataArr = [
      {"id":"Gib", "img":"assets/images/2.0.svg", "title":"Active Free Tier","link":"payment/chooseplan","isvalue":1,},
      {"id":"Ezbot", "img":"assets/images/Ezbot.svg", "title":"Upgrade","expirytime":"29","isvalue":0,},
      {"id":"Ezflow", "img":"assets/images/ezflow.svg", "title":"Upgrade","expirytime":"20","isvalue":0,},
    ];
    // this.dt.changeHints(this.hints.homeHints);
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

  loopTrackBy(index, term){
    return index;
  }

  selecteddata(selectedData,index){
    this.selectedIndex = index;
    console.log("index",this.dataArr[index])
  }
  
}