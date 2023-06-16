import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getApiUrl } from 'src/app/service/utils';
import { HttpService } from 'src/app/service/http.service/http.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { NgAxiosComponent } from 'src/app/service/ng-axios/ng-axios.component';
import { StoreService } from 'src/app/service/StoreService/store.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})



export class PrivacyComponent implements OnInit {
 
  public ngAxios : any;
  public currentPath: any;
  public catId: any;
  public service: any;
  private url_privacy = getApiUrl('api/service/content/');
  constructor(public location: Location,private router: Router,public storeService: StoreService,public httpService: HttpService, private _snackBar: MatSnackBar,private sanitizer: DomSanitizer) {
    this.currentPath = location.path();  
    this.ngAxios = new NgAxiosComponent( this.httpService,_snackBar ); 
    this.storeService.data$.subscribe((data:any)=>{
      for(let i=0; i< Object.keys(data).length;i++){
        if(this.currentPath.includes(data[i].url)){
          this.catId = data[i].id;
        }
      }
      let url = this.url_privacy + this.catId; 
      if(this.catId != undefined){
        this.ngAxios.ng_get(url, (data:any)=>{
          data && data.map((item:any)=>{
            // let images = item.images;
            // images = images.replace(/'/g, '"');
            // let _images = JSON.parse(images);
            // item.images = _images;
            
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
            this.service = item;
          })
        });
      }
    })
  }
  ngOnInit() {
   
  }  
  
  onScrollFooter(){
    const a = document.getElementById('footer');
    a?.scrollIntoView({behavior: 'smooth'});
  }
}
