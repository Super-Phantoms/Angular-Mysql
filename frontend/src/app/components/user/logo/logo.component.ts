import { Component, OnInit} from '@angular/core';
import { StoreService } from 'src/app/service/StoreService/store.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-userlogo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})

export class LogoComponent implements OnInit {
  
  public bgImg: any;
  public title: any;
  public currentPath: any;
  public currentMenu:any;
  constructor(public location: Location, private router: Router,public storeService: StoreService) {
    this.currentPath = location.path(); 
    this.storeService.data$.subscribe((data)=>{      
        this.currentMenu = data;
        for(let i=0; i< Object.keys( this.currentMenu).length;i++){
          if(this.currentPath.includes(this.currentMenu[i].url)){
            let img = this.currentMenu[i].images;
            if(img){
              img = img.replace(/'/g, '"');
              img = JSON.parse(img);
              this.bgImg = img[0].img;
              this.title = img[0].title;
            }           
          }
        }
    });
  }
  ngOnInit() {
   
  }
  onMousey(){  
    const a = document.getElementById('scroll');
    a?.scrollIntoView({behavior: 'smooth'});
    // .scrollIntoView({behavior: 'smooth'});
  }  

}

