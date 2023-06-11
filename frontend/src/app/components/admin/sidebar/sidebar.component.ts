import { Component, OnInit, Input, AfterContentChecked, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { get, ready} from 'scriptjs';

declare const $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit{
  @Input() menuItems: any[]  = [];
  currentPath: string = '';

  constructor( public location: Location, private router: Router) {
    this.currentPath = location.path();
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.url;
      }
    });
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    setTimeout(function() {
      get('assets/js/admin/common.min.js', function() {
        get('assets/js/admin/admin_common.min.js', function() {
        });
    });
    }, 300);
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
