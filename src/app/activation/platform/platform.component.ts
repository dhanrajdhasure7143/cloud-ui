import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductlistService } from 'src/app/_services/productlist.service';
import { UserService } from 'src/app/_services';
import { Particles } from 'src/app/_models/particlesjs';


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
  constructor(private router: Router,
              private productlistservice:ProductlistService,
              public userService: UserService,
              private particles :Particles
    ) { }
  public dataArr:any[];
  public selectedIndex:number;
  public selectedId:any;
  public isenable:boolean=true;
  public selectedIdValue:number=1;
  ngOnInit() {
    this.particles.getParticles();
    this.productlistservice.getAllProducts().subscribe(data => {this.productslist = data
        });
    
    this.dataArr = [
      {"id":"Gib", "img":"assets/images/2.0.svg", "title":"Active Free Tier","isvalue":1,},
      {"id":"ezbot", "img":"assets/images/Ezbot.svg", "title":"Upgrade","expirytime":"29","isvalue":0,},
      {"id":"ezflow", "img":"assets/images/ezflow.svg", "title":"Upgrade","expirytime":"20","isvalue":0,},
    ];
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