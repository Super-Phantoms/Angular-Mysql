import { Component, ElementRef,Renderer2,OnInit,AfterViewInit, Input,AfterViewChecked, AfterContentChecked} from '@angular/core';
import { StoreService } from 'src/app/service/StoreService/store.service';
import { HttpService } from 'src/app/service/http.service/http.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { get } from 'scriptjs';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import * as $ from 'jquery';

const jsPaths=[
  // '/assets/js/theplus-post-394.min.js'
]

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit,AfterViewInit,AfterViewChecked{
  loadJs(index) {    
    get(jsPaths[index], () => {
      if(index < jsPaths.length - 1) {
        index++;
        this.loadJs(index);
      }
    })
  }
 
  @Input() expressBtn:any;
  @Input() services:any;
  public currentPath: any;
  public flag:boolean = false;
  constructor(public location: Location,private router: Router,public storeService: StoreService,public httpService: HttpService,private elRef: ElementRef,private renderer: Renderer2,@Inject(DOCUMENT) private document: Document) {
   
    this.currentPath = location.path();   
    
    
  };
  ngOnInit() {
    this.flag = false;
    
  }  
  ngAfterViewChecked() {
    let mobile_headerTitle = $("#mobile-heading-title");
    let mobile_left_separator = $("#mobile-left-separator");
    let mobile_right_separator = $("#mobile-right-separator");
    if(mobile_headerTitle.length > 0){
      let title = mobile_headerTitle[0].textContent;
      if(title && title.length < 20){
          mobile_left_separator.addClass("width-20");
          mobile_right_separator.addClass("width-20");
          mobile_headerTitle.addClass("width-60");
      }
      else{
          mobile_left_separator.addClass("width-10");
          mobile_right_separator.addClass("width-10");
          mobile_headerTitle.addClass("width-80");
      }
      
    }
   

  }
  ngAfterViewInit(): void {
    // this.loadJs(0);   
    let theThis = this;
    setTimeout(function() {
      const headerTitle = theThis.elRef.nativeElement.querySelectorAll('.heading-title');
      const right_separator = theThis.elRef.nativeElement.querySelectorAll('.right-separator');
      if(headerTitle.length == right_separator.length){
        for (let i = 0; i < headerTitle.length; i++) {   
            const element = headerTitle[i];      
            let title = element.textContent;
            let title_width = Number(title.length*1.8);
            let title_width_str = title_width+"%";
            let separator = Number(100 - title_width);
            let separator_str = separator + "%";
              theThis.renderer.setStyle(headerTitle[i], 'width', title_width_str);
              theThis.renderer.setStyle(right_separator[i], 'width', separator_str);
          
        }
      }
     
    },2000)
     
  }
  onScrollFooter(){
    const a = document.getElementById('footer');
    a?.scrollIntoView({behavior: 'smooth'});
  }
  watchVideo(){
    setTimeout(() => {
      let lightbox = $(".elementor-aspect-ratio-169");
      this.renderer.setStyle(lightbox[0], 'top', '0px');
      this.renderer.setStyle(lightbox[0], 'left', '0px');
    }, 300);
  }
 
}
