import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductlistService } from 'src/app/_services/productlist.service';
import { UserService } from 'src/app/_services';
import 'particles.js/particles';
// import * as particlesJS from 'particlesjs';

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
  public productId:any;
  constructor(private router: Router,private productlistservice:ProductlistService,public userService: UserService) { }

  public dataArr:any[];
  public selectedIndex:number;
  public selectedId:any;
  public isenable:boolean=true;
  public selectedIdValue:number=1;

  ngOnInit() {
    this.productlistservice.getAllProducts().subscribe(data => {this.productslist = data
          console.log("products",this.productslist)    
        });
    
    this.dataArr = [
      {"id":"Gib", "img":"assets/images/2.0.svg", "title":"Active Free Tier","isvalue":1,},
      {"id":"ezbot", "img":"assets/images/Ezbot.svg", "title":"Upgrade","expirytime":"29","isvalue":0,},
      {"id":"ezflow", "img":"assets/images/ezflow.svg", "title":"Upgrade","expirytime":"20","isvalue":0,},
    ];
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
    this.isenable=false;
    this.selectedIndex=index;
    this.selectedId=selectedData.id;
    localStorage.setItem('selectedproductId',this.selectedId);
    this.selectedIdValue=selectedData.isvalue
    console.log('data',selectedData.id)
    this.productId=selectedData.id
  }
  navigateProduct(selectedproduct){
    if(this.selectedId == '2.0'){
      alert("2.0")
    }else if(this.selectedId == 'ezbot'){
      alert("2.0")
    // this.router.navigate(['/pages/designstudio/botcreate'])
    }else if(this.selectedId == 'ezflow'){
      alert("EzFlow")
    }

  }
  
}