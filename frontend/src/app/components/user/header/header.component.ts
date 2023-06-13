import { Component, OnInit, Renderer2, ElementRef, Input} from '@angular/core';
import { StoreService } from 'src/app/service/StoreService/store.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userheader',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  public receiveData: any;  
  public mainMenus: any[]=[];
  public currentPath: any;
  public address1:any;
  public address2:any;
  public realAddress1: any;
  public realAddress2: any;
  public footMenus: any[]=[];
  constructor(public location: Location, private router: Router,public storeService: StoreService) {
    this.currentPath = location.path(); 
    this.storeService.data$.subscribe((data)=>{
      this.receiveData = data;
      let solutionSubmenus:any[]=[];
      let marketSubmenus:any[]=[];
   
    for(let i=0; i< Object.keys(this.receiveData).length;i++){
      if(this.receiveData[i].type == '3'){
        this.receiveData[i].url='/solutions'+this.receiveData[i].url;
        solutionSubmenus.push(this.receiveData[i]);            
      }
      else if(this.receiveData[i].type == '4'){
        this.receiveData[i].url='/markets'+this.receiveData[i].url;
        marketSubmenus.push(this.receiveData[i]);            
      }
      else if (this.receiveData[i].type != '7' && this.receiveData[i].type != '8' && this.receiveData[i].type != '9'){
        this.mainMenus.push(this.receiveData[i]);
      }        
      else if (this.receiveData[i].type == '8' || this.receiveData[i].type == '9'){
        this.footMenus.push(data[i]);   
      }
    }
    if(Object.keys(data).length > 0){
      this.mainMenus.splice(2,0,{title:'Solutions',url:'/solutions', type:'3', subMenus:solutionSubmenus});
      this.mainMenus.splice(3,0,{title:'Markets',url:'/markets', type:'4', subMenus:marketSubmenus});
    }
  })
  
  this.storeService.contacts$.subscribe((data:any)=>{
    if(Object.keys(data).length == 0) return;
    this.address1 = data[0];
    this.address1.address = this.address1.address.replace(/\n/g, '<br>');
    this.address2 = data[1];
    this.address2.address = this.address2.address.replace(/\n/g, '<br>');
    let address1 = data[0].address;
    address1 = address1.replace(/<br>/g, ' ');
    let address2 = data[1].address;
    address2 = address2.replace(/<br>/g, ' ');
    this.realAddress1 = `https://maps.google.com/maps?q=${address1}&t=m&z=14&output=embed&iwloc=near`;
    this.realAddress2 = `https://maps.google.com/maps?q=${address2}&t=m&z=14&output=embed&iwloc=near`;
    
    let iframe:any = document.getElementById("map1");
    iframe && (iframe.src = this.realAddress1);
    iframe = document.getElementById("map2");
    iframe && (iframe.src = this.realAddress2);

    let a:any = document.getElementsByClassName("map-link1");
    for(let i=0;i<a.length;i++)     
      a[i].href = `https://maps.google.com/maps?z=14&t=m&hl=en-US&gl=US&mapclient=embed&q=${address1}`;
    a = document.getElementsByClassName("map-link2");
    for(let i=0;i<a.length;i++)     
      a[i].href = `https://maps.google.com/maps?z=14&t=m&hl=en-US&gl=US&mapclient=embed&q=${address2}`;

  });
    
   }

  ngOnInit() {
    
  }
 

}
