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
  public products:any[]=[];
  public selectedIndex:number;
  public selectedId:any;
  public isenable:boolean=true;
  public selectedIdValue:boolean=true;
  ngOnInit() {
    this.particles.getParticles();
    this.tenantId=localStorage.getItem('tenantName')
    this.productlistservice.getAllProducts(this.tenantId).subscribe(data => {this.productslist = data
      this.productslist[1].img="assets/images/2.0.svg";
      this.productslist[1].freetier=false;
      // this.productslist[1].expirytime=10;
      this.products=[this.productslist[1]];
      if( this.productslist[1].freetier == true){
        this.productslist[1].title = 'Active Free Tier';
      }else{
        this.productslist[1].title = 'Upgrade';
      }
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
    this.selectedIdValue=selectedData.subscribed;
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