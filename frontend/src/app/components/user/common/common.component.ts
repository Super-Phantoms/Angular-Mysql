import { Component, OnInit, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { get } from 'scriptjs';

const jsPaths=[
  
  'assets/js/jquery.min.js',
  'assets/js/jquery-migrate.min.js',
  'assets/js/elementor-widgets.js',
  'assets/js/preloader-plus.min.js',
  'assets/js/v4-shims.min.js',
  'assets/js/she-header.js',  
  'assets/js/ecs_ajax_pagination.js',
  'assets/js/preloaded-elements-handlers.min.js',
  'assets/js/mailin-front.js',
  'assets/js/ecs.js',
  'assets/js/moving-ant.js',

//under -last
  'assets/js/style.min.js',
  'assets/js/core.min.js',
  'assets/js/mouse.min.js',
  'assets/js/slider.min.js',
  'assets/js/theplus-post-17.min.js',
  'assets/js/astra-addon-6294d38053ea53-48792690.js',
  'assets/js/three.min.js',
  'assets/js/swiper.min1.js',
  'assets/js/anime.min.js',
  'assets/js/webfontloader.js',

  'assets/js/jquery.easing.min.js',
  'assets/js/masterslider.min.js',
  'assets/js/jquery.smartmenus.min.js',
  'assets/js/webpack.runtime.min.js',
  'assets/js/frontend-modules.min.js',
  'assets/js/dialog.min.js',
  'assets/js/waypoints.min.js',
  'assets/js/share-link.min.js',
  'assets/js/swiper.min.js',
  'assets/js/frontend.min1.js',  
  'assets/js/ecspro.js',
  'assets/js/bdt-uikit.min.js',
  'assets/js/element-pack-site.min.js',
  'assets/js/webpack-pro.runtime.min.js',
  'assets/js/jquery.sticky.min.js',
  'assets/js/frontend.min.js',
  
  'assets/js/transitionSlider.min.js',
  'assets/js/embed.js',
];

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})
export class CommonComponent implements OnInit, AfterViewInit {

  loadJs(index) {
    console.log('loadng... ' + jsPaths[index]);
    get(jsPaths[index], () => {
      if(index < jsPaths.length - 1) {
        index++;
        this.loadJs(index);
      }
    })
  }
  constructor(private router: Router,private renderer: Renderer2, private el: ElementRef) {
  };
  ngOnInit() {
    
  }  
  ngAfterViewInit(): void {
    // this.loadJs(0);
  }
 

}
