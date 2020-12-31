import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductlistService } from 'src/app/_services/productlist.service';
import { UserService } from 'src/app/_services';
import { Particles } from 'src/app/_models/particlesjs';

import Swal from 'sweetalert2';
import { APP_CONFIG } from 'src/app/app.config';
import { ProfileService } from 'src/app/_services/profile.service';


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
  visibletest: any=[];
  expiryDate: any;
  freetrailDetails: any;
  isFree: boolean=true;
  freetrailAvailed: any;
  remainingDays: any;
   public products:any[]=[];
  public selectedIndex:number;
  public selectedId:any;
   public isenable:boolean=true;
  public selectedIdValue:boolean=false;
  showexpiryinfo: boolean=false;
  userRole: any = [];
  showexpiryinfoezflow: boolean=false;
  showexpiryinfoezbot: boolean=false;
  remainingDaysezflow: any;
  remainingDaysezbot: number;
  constructor(private router: Router,
    private productlistservice:ProductlistService,
    public userService: UserService,
    private profileservice: ProfileService,
    private particles :Particles,
    @Inject(APP_CONFIG) private config,
) { }
  ngOnInit() {
    this.particles.getParticles();
    this.tenantId=localStorage.getItem('tenantName')
    this.profileservice.getUserRole(2).subscribe(role => {
      this.userRole = role.message;

    })
   
    this.productlistservice.getAllProducts().subscribe(data => {this.productslist = data
      this.products=this.productslist;
      this.products.forEach(element => {
            if(element.meta.visible=='true'){
                   this.visibletest.push(element)
                }
                  });
    this.productslist.forEach(prod => {
        // if(!prod.freetrailAvailed){}
         if(prod.id === "2.0"){
           prod.img = "assets/images/2.0.svg"
           this.productlistservice.getFreeTierInfo('2.0').subscribe(data=>{
             
            this.freetrailAvailed=data;
            if(this.freetrailAvailed.Expirerin!=null){
              this.remainingDays=this.freetrailAvailed.Expirerin;
              console.log("muy daataaaaaaaaaa",this.remainingDays)
            }
            else{
              this.remainingDays=null;
            }
            if(prod.subscribed==true&&this.remainingDays==null){
              this.showexpiryinfo=false;
              console.log("free trial 2.0 completed")
  
            }
            else if(prod.subscribed==true&&this.remainingDays>=1){
              console.log("remaining days",this.remainingDays)
              this.showexpiryinfo=true;
            }
            else if(prod.subscribed==false){
              this.showexpiryinfo=false;
           
            }
          }) 
          
         }
        else if(prod.id === "ezflow"){
          
           prod.img = "assets/images/ezflow.svg"
           this.productlistservice.getFreeTierInfo('ezflow').subscribe(data=>{
            this.freetrailAvailed=data;
            if(this.freetrailAvailed.Expirerin!=null){
              this.remainingDaysezflow=this.freetrailAvailed.Expirerin;
            }
            else{
              this.remainingDaysezflow=null;
            }
            if(prod.subscribed==true&&this.remainingDaysezflow==null){
              this.showexpiryinfoezflow=false;
              console.log("free trial ezflow completed")
  
            }
            else if(prod.subscribed==true&&this.remainingDaysezflow>=1){
              console.log("remaining days",this.remainingDaysezflow)
              this.showexpiryinfoezflow=true;
            }
            else if(prod.subscribed==false){
              this.showexpiryinfoezflow=false;
              console.log("u need to subscribe ezf;pow")
            }
          }) 
           
         }
       else  if(prod.id === "ezbot"){
           
           prod.img = "assets/images/Ezbot.svg"
           this.productlistservice.getFreeTierInfo('ezbot').subscribe(data=>{
            this.freetrailAvailed=data;
            if(this.freetrailAvailed.Expirerin!=null){
              this.remainingDaysezbot=this.freetrailAvailed.Expirerin;
            }
            else{
              this.remainingDaysezbot=null;
            }
            if(prod.subscribed==true&&this.remainingDaysezbot==null){
              this.showexpiryinfoezbot=false;
              console.log("free trial ezbot completed")
  
            }
            else if(prod.subscribed==true&&this.remainingDaysezbot>=1){
              console.log("remaining days",this.remainingDaysezbot)
              this.showexpiryinfoezbot=true;
            }
            else if(prod.subscribed==false){
              this.showexpiryinfoezbot=false;
              console.log("u need to subscribe ezbot")
            }
          }) 
        
         }
 
        
        
      });
      //this.productslist[1].img="assets/images/2.0.svg";
      // this.productslist[1].freetier=false;
      // this.productslist[1].expirytime=10;
    
     
      // if( this.productslist[1].freetier == true){
      //   this.productslist[1].title = 'Active Free Tier';
      // }else{
      //   this.productslist[1].title = 'Upgrade';
      // }
        
  })
  console.log("visibletest",this.visibletest)
}


  loopTrackBy(index, term){
    return index;
  }

  selecteddata(selectedData,index){
    console.log("selectedData",selectedData)
    this.isenable=false;
    this.selectedIndex=index;
    this.selectedId=selectedData.id;
    // localStorage.setItem('selectedproductId',this.selectedId);
    this.selectedIdValue=selectedData.subscribed;
    this.productId=selectedData.id
  
  }
  navigateProduct(selectedproduct){
    //added this for navigate to 2.0 ui
    var token=JSON.parse(localStorage.getItem('currentUser'));
    var encryptToken=btoa(token.accessToken)
    var encryptrefreshToken=btoa(token.refreshToken);
    var firstName=localStorage.getItem('firstName');
    var lastName=localStorage.getItem('lastName');
    var ProfileuserId=localStorage.getItem('ProfileuserId');
    var tenantName=localStorage.getItem('tenantName');
    window.location.href=this.config.productendpoint+"/#/pages/home?accessToken="+encryptToken+'&refreshToken='+encryptrefreshToken+'&firstName='+firstName+'&lastName='+lastName+'&ProfileuserId='+ProfileuserId+'&tenantName='+tenantName
    // Swal.fire({
    //   title: 'Info!',
    //   text: `Coming soon...`,
    //   type: 'info',
    //   showCancelButton: false,
    //   allowOutsideClick: false
    // })
    // // if(this.selectedId == '2.0'){
    //   alert("2.0")
    // }else if(this.selectedId == 'ezbot'){
    //   alert("2.0")
    // // this.router.navigate(['/pages/designstudio/botcreate'])
    // }else if(this.selectedId == 'ezflow'){
    //   alert("EzFlow")
    // }

  }
  
  upgradePlan(){
    localStorage.setItem('selectedproductId',this.selectedId);   
    this.router.navigate(["/activation/payment/chooseplan"])
  } 
  onselectMetrics(){
    this.router.navigate(["/activation/metrics"])
  }
}