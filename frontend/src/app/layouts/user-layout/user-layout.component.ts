import { Component, OnInit,OnDestroy,ViewEncapsulation, ElementRef, ViewChild, Input, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { get, ready } from 'scriptjs';
import { Location } from '@angular/common';
import { HttpService } from 'src/app/service/http.service/http.service';
import { NgAxiosComponent } from 'src/app/service/ng-axios/ng-axios.component';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { StoreService } from 'src/app/service/StoreService/store.service';
import { getApiUrl } from 'src/app/service/utils';
import { Title } from '@angular/platform-browser';

const jsPaths=[
  '/assets/js/jquery.min.js',
  'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js',
  '/assets/js/jquery-migrate.min.js',
  '/assets/js/elementor-widgets.js',
  '/assets/js/preloader-plus.min.js',
  '/assets/js/v4-shims.min.js',
  '/assets/js/she-header.js',  
  '/assets/js/mailin-front.js',
  '/assets/js/ecs.js',
  '/assets/js/ecs_ajax_pagination.js',
  '/assets/js/common.js',  
  '/assets/js/formidable.min.js',  
  '/assets/js/formidablepro.min.js',
  'https://www.google.com/recaptcha/api.js?onload=frmRecaptcha&#038;render=explicit&#038;ver=3',
  '/assets/js/moving-ant.js',
  '/assets/js/style.min.js',
  '/assets/js/core.min.js',
  '/assets/js/mouse.min.js',
  '/assets/js/slider.min.js',
  '/assets/js/theplus-post-17.min.js',  
  '/assets/js/astra-addon-6294d38053ea53-48792690.js',
  '/assets/js/three.min.js',
  '/assets/js/swiper.min1.js',
  '/assets/js/anime.min.js',
  '/assets/js/webfontloader.js',
  '/assets/js/transitionSlider.min.js',
  '/assets/js/embed.js',
  '/assets/js/jquery.easing.min.js',
  '/assets/js/masterslider.min.js',
  '/assets/js/jquery.smartmenus.min.js',
  '/assets/js/webpack.runtime.min.js',
  '/assets/js/frontend-modules.min.js',
  '/assets/js/dialog.min.js',
  '/assets/js/waypoints.min.js',
  '/assets/js/share-link.min.js',
  '/assets/js/swiper.min.js',
  '/assets/js/imagesloaded.min.js',
  '/assets/js/ecspro.js', 
  '/assets/js/webpack-pro.runtime.min.js',
  '/assets/js/frontend.min1.js',  
  '/assets/js/jquery.sticky.min.js',
  '/assets/js/frontend.min.js', 
  '/assets/js/preloaded-elements-handlers.min.js',  
  '/assets/js/element-pack-site.min.js',
  '/assets/js/theplus-post-394.min.js',
  '/assets/js/theplus-post-265.min.js',
  '/assets/js/theplus-post-373.min.js',  
  '/assets/js/theplus-post-191.min.js',
  '/assets/js/theplus-post-875.min.js',  
  '/assets/js/theplus-post-394.min.js', 
  '/assets/js/bdt-uikit.min.js',
  
];



@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: [
    './user-layout.component.scss',    
  ],
 
})

export class UserLayoutComponent implements OnInit, AfterViewInit, OnDestroy{
  
  @ViewChild('container') container: ElementRef | undefined;
  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  loadJs(index) {    
    get(jsPaths[index], () => {
      if(index < jsPaths.length - 1) {
        index++;
        this.loadJs(index);
      } else {
        let w = window as any;
        w.elementorFrontend.init();
      }
    })
  }



  public currentPath: any;
  public ngAxios : any;
  private url_service_categories = getApiUrl('api/srvcategory');
  private url_contact = getApiUrl('api/contact');
 
  public address2:any;
  public realAddress1: any;
  public realAddress2: any;
  constructor(public location: Location,private router: Router,private titleService: Title,public httpService: HttpService,public storeService: StoreService,private _snackBar: MatSnackBar) {
   
    this.currentPath = location.path();    
    this.ngAxios = new NgAxiosComponent( this.httpService,_snackBar );  
    let theThis = this;  
    this.ngAxios.ng_get(this.url_service_categories, (data:any)=>{
      for(let i=0; i< Object.keys(data).length;i++){
        if(this.currentPath.includes(data[i].url) && !this.currentPath.includes('detail')){
            this.setTitle(data[i].site_title);
        }        
    } 
      theThis.storeService.updateData(data);
    });
    this.ngAxios.ng_get(this.url_contact, (data:any)=>{
      theThis.storeService.updateContacts(data);
    });
   };
  
  ngOnInit() {   
   
  }
  ngAfterViewInit(): void {
   
      this.loadJs(0);
  }
  ngOnDestroy() {
   
  }
 
}
