import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { NgAxiosComponent } from 'src/app/service/ng-axios/ng-axios.component';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { getApiUrl } from 'src/app/service/utils';
import { HttpService } from 'src/app/service/http.service/http.service';
import * as $ from "jquery";
import { filter, Subscription } from 'rxjs';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { StoreService } from 'src/app/service/StoreService/store.service';
import { MatDialog } from '@angular/material/dialog';
import { PwdcngDialogComponent } from 'src/app/components/admin/pwdcng-dialog/pwdcng-dialog.component';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: [
    './admin-layout.component.scss',
    ]
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {
  private _router: Subscription | undefined;
  private lastPoppedUrl: string | undefined;
  private yScrollStack: number[] = [];
  private axios: NgAxiosComponent;
  private store: StoreService;
  
  menuItems: any[] = []
  currentMenuPath: string;
  services: any[] = [];

  /**
   * the variable for admin page block while ajax comm...
   */
  loading = false;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;

  loadServiceCategories() {
    let theThis = this;
    const url = getApiUrl('api/srvcategory/short');
    this.axios.ng_get(url, function(data) {
        theThis.services = data;
        theThis.store.updateCategories(data);

        theThis.menuItems.push({ path: '/admin/home/1', title: 'Home',  icon: 'home'});
        theThis.menuItems.push({ path: '/admin/aboutus/2', title: 'About Us',  icon: 'man'});
        theThis.menuItems.push({ path: '/admin/team', title: 'Team Members',  icon: 'handshake'});

        theThis.menuItems.push({ path: '/admin/solution', title: 'Solutions',  icon:'assistant', 
        subMenus : data.filter((d)=>d.type === 3).map((d) => {
            return {
            path: '/admin/solution/' + d.id,
            title: d.title,
            icon: 'assistant'
            }
        })});

        theThis.menuItems.push({ path: '/admin/market', title: 'Market',  icon:'stars', 
        subMenus : data.filter((d)=>d.type === 4).map((d) => {
            return {
            path: '/admin/market/' + d.id,
            title: d.title,
            icon: 'stars'
            }
        })});   

        theThis.menuItems.push({ path: '/admin/partner', title: 'Partner',  icon: 'man'});
        theThis.menuItems.push({ path: '/admin/contactus', title: 'Contact Us',  icon: 'handshake'});
        theThis.menuItems.push({ path: '/admin/footer', title: 'Footer',  icon:'assistant', 
        subMenus : data.filter((d)=>d.type === 8).map((d) => {
            return {
            path: '/admin/footer/' + d.id,
            title: d.title,
            icon: 'assistant'
            }
        })});

        theThis.menuItems.push({ path: '/admin/blog/21', title: 'Blog',  icon: 'stars'});


    });
  }

  verifyToken = () => {
    const theThis = this;

    const token = localStorage.getItem('jwt_token');
    if(!token) {
        window.location.href = '/login';
        return;
    }

    const url = getApiUrl('api/auth/chk_token');
    this.axios.ng_get(url, function(res) {
        if(res == true) {
            theThis.loadServiceCategories();
        } else {
            localStorage.removeItem('jwt_token');
            window.location.href = '/login';
        }
    });
  }

  constructor(  public httpService: HttpService, 
                private _snackBar: MatSnackBar, 
                private s: StoreService,
                public location: Location, 
                private router: Router,
                private dialog: MatDialog) {
    this.store = s;
    this.axios = new NgAxiosComponent( httpService, _snackBar);

    // To verify jwt_token
    this.verifyToken();

    this.currentMenuPath = 'Dashboard';
    let theThis = this;
 
    router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
            let pathSegments = event.url.split('/');
            if(pathSegments[2] === 'aboutus') theThis.currentMenuPath = 'About Us';
            if(pathSegments[2] === 'home') theThis.currentMenuPath = 'Home';
            if(pathSegments[2] === 'solution') theThis.currentMenuPath = 'Solution';
            if(pathSegments[2] === 'market') theThis.currentMenuPath = 'Market';
            if(pathSegments[2] === 'career') theThis.currentMenuPath = 'Career';
            if(pathSegments[2] === 'service') theThis.currentMenuPath = 'Service';
            if(pathSegments[2] === 'partner') theThis.currentMenuPath = 'Partner';
            if(pathSegments[2] === 'footer') theThis.currentMenuPath = 'Footer';


            if(pathSegments[3] != undefined) {
                let service = theThis.services.find(s=>s.id == pathSegments[3]);
                if(service) theThis.currentMenuPath += " / " + service.title;
            }
        }
    })
  }

  ngOnInit() {

      const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

      const elemMainPanel = <HTMLElement>document.querySelector('#page_content');
      const elemSidebar = <HTMLElement>document.querySelector('#sidebar_main');

      this.location.subscribe((ev:PopStateEvent) => {
          this.lastPoppedUrl = ev.url;
      });
       this.router.events.subscribe((event:any) => {
          if (event instanceof NavigationStart) {
             if (event.url != this.lastPoppedUrl)
                 this.yScrollStack.push(window.scrollY);
         } else if (event instanceof NavigationEnd) {
             if (event.url == this.lastPoppedUrl) {
                 this.lastPoppedUrl = undefined;
                 window.scrollTo(0, this.yScrollStack.pop() as number);
             } else
                 window.scrollTo(0, 0);
         }
      });
      this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
           elemMainPanel.scrollTop = 0;
           elemSidebar.scrollTop = 0;
      });

      const window_width = $(window).width() as number;
      let $sidebar = $('.sidebar');
      let $sidebar_responsive = $('body > .navbar-collapse');
      let $sidebar_img_container = $sidebar.find('.sidebar-background');


      if(window_width > 767){
          if($('.fixed-plugin .dropdown').hasClass('show-dropdown')){
              $('.fixed-plugin .dropdown').addClass('open');
          }

      }

      $('.fixed-plugin a').click(function(event){
        // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
          if($(this).hasClass('switch-trigger')){
              if(event.stopPropagation){
                  event.stopPropagation();
              }
              else if(window.event){
                 window.event.cancelBubble = true;
              }
          }
      });

      $('.fixed-plugin .badge').click(function(){
          let $full_page_background = $('.full-page-background');

          $(this).siblings().removeClass('active');
          $(this).addClass('active');

          var new_color = $(this).data('color');

          if($sidebar.length !== 0){
              $sidebar.attr('data-color', new_color);
          }

          if($sidebar_responsive.length != 0){
              $sidebar_responsive.attr('data-color',new_color);
          }
      });

      $('.fixed-plugin .img-holder').click(function(){
          let $full_page_background = $('.full-page-background');

          $(this).parent('li').siblings().removeClass('active');
          $(this).parent('li').addClass('active');


          var new_image = $(this).find("img").attr('src');

          if($sidebar_img_container.length !=0 ){
              $sidebar_img_container.fadeOut('fast', function(){
                 $sidebar_img_container.css('background-image','url("' + new_image + '")');
                 $sidebar_img_container.fadeIn('fast');
              });
          }

          if($full_page_background.length != 0){

              $full_page_background.fadeOut('fast', function(){
                 $full_page_background.css('background-image','url("' + new_image + '")');
                 $full_page_background.fadeIn('fast');
              });
          }

          if($sidebar_responsive.length != 0){
              $sidebar_responsive.css('background-image','url("' + new_image + '")');
          }
      });

      $(document.body).addClass('sidebar_main_open');
  }

  ngAfterViewInit() {
      this.runOnRouteChange();
  }

  isMaps(path: string){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      titlee = titlee.slice( 1 );
      if(path == titlee){
          return false;
      }
      else {
          return true;
      }
  }

  runOnRouteChange(): void {
  }

  isMac(): boolean {
      let bool = false;
      if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
          bool = true;
      }
      return bool;
  }

  onBtnLogoutClick = () => {
    localStorage.removeItem("jwt_token");
    this.store.updateIsLoggon(false);
    this.router.navigateByUrl('/login');
  }

  onBtnChangePassClick = () => {
    const dialogRef = this.dialog.open(PwdcngDialogComponent, {
        data: {},
        width: '450px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
        // 
    });
  }
}
