import { Component, OnInit,AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/service/StoreService/store.service';
import { HttpService } from 'src/app/service/http.service/http.service';
import { NgAxiosComponent } from 'src/app/service/ng-axios/ng-axios.component';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { getApiUrl } from 'src/app/service/utils';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public currentPath: any;
  public mainMenus: any;
  public catId: any;
  public ngAxios : any;
  public products: any[]=[];
  public services: any[]=[];
  private url_service_categories = getApiUrl('api/service/content/');
  
  constructor(public location: Location,private router: Router,public storeService: StoreService,public httpService: HttpService, private _snackBar: MatSnackBar,private sanitizer: DomSanitizer) {
    
    this.currentPath = location.path();   
    this.ngAxios = new NgAxiosComponent( this.httpService ,_snackBar);  
    this.storeService.data$.subscribe((data)=>{
      this.mainMenus = data;
      for(let i=0; i< Object.keys(this.mainMenus).length;i++){
          if(this.currentPath.includes(this.mainMenus[i].url)){
              this.catId = this.mainMenus[i].id;
          }
      }      
      let url = this.url_service_categories + this.catId; 
      if(this.catId != undefined){
        this.ngAxios.ng_get(url, (data:any)=>{
          data && data.map((item:any)=>{
            let images = item.images;
            images = images.replace(/'/g, '"');
            let _images = JSON.parse(images);
            item.images = _images;
            item.summary = this.sanitizer.bypassSecurityTrustHtml(item.summary);
            let subject = item && item.subject;            
            subject = subject && subject.replace(/<p.*?>/gi, "");
            subject = subject && subject.replace(/<\/p>/g, '');
            subject = subject && subject.replace(/font-size/g, '');
            item.subject = this.sanitizer.bypassSecurityTrustHtml(subject);   
            let mobile_subject = item && item.mobile_subject;            
            mobile_subject = mobile_subject && mobile_subject.replace(/<p.*?>/gi, "");
            mobile_subject = mobile_subject && mobile_subject.replace(/<\/p>/g, '<br>');
            mobile_subject = mobile_subject && mobile_subject.replace(/font-size/g, '');
            item.mobile_subject = this.sanitizer.bypassSecurityTrustHtml(mobile_subject);   
            if(item.gallery == 0){             
              this.services.push(item);
            }
            else if(item.gallery == 3){             
              this.products.push(item);
            }          
          })
        });
      }
    });
  };

  ngOnInit() {
   
  }

}
