import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/service/StoreService/store.service';
import { HttpService } from 'src/app/service/http.service/http.service';
import { NgAxiosComponent } from 'src/app/service/ng-axios/ng-axios.component';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { getApiUrl } from 'src/app/service/utils';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public solutions: any[]=[];
  public markets: any[]=[];
  public currentPath: any;
  public mainMenus: any;
  public catId: any;
  public ngAxios : any;
  public products: any[]=[];
  public services: any;
  private url_service_categories = getApiUrl('api/service/content/');
  constructor(public location: Location,private router: Router,public storeService: StoreService,public httpService: HttpService, private _snackBar: MatSnackBar,private sanitizer: DomSanitizer) {
    this.currentPath = location.path();   
    this.ngAxios = new NgAxiosComponent( this.httpService ,_snackBar);  
    this.storeService.data$.subscribe((data:any)=>{
      for(let i=0; i< Object.keys(data).length;i++){
        if(this.currentPath.includes(data[i].url)){
          this.catId = data[i].id;
        }
        if(data[i].type == '3'){
          if(data[i].images){
            let images = data[i].images;
            images = images.replace(/'/g, '"');
            images = JSON.parse(images);
            data[i].images = images;
            this.solutions.push(data[i])
          }          
        }
        else if(data[i].type == '4'){
          if(data[i].images){
            let images = data[i].images;
            images = images.replace(/'/g, '"');
            images = JSON.parse(images);
            data[i].images = images;
            let title = data[i].title;
            title  = title.split('/');
            title = title[0];
            data[i].title = title;
            this.markets.push(data[i]);
          }
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
            subject = subject && subject.replace(/<\/p>/g, '<br>');
            subject = subject && subject.replace(/font-size/g, '');
            item.subject = this.sanitizer.bypassSecurityTrustHtml(subject);
            let mobile_subject = item && item.mobile_subject;            
            mobile_subject = mobile_subject && mobile_subject.replace(/<p.*?>/gi, "");
            mobile_subject = mobile_subject && mobile_subject.replace(/<\/p>/g, '<br>');
            mobile_subject = mobile_subject && mobile_subject.replace(/font-size/g, '');
            item.mobile_subject = this.sanitizer.bypassSecurityTrustHtml(mobile_subject);      
            this.services = item;
          })
        });
      }   
    })

  };

  ngOnInit() {
    
  }
 
}
