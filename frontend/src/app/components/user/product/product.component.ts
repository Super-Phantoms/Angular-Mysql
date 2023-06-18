import { Component, OnInit , Input,AfterViewChecked,ViewChild, TemplateRef} from '@angular/core';
import { get } from 'scriptjs';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import * as $ from 'jquery';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit,AfterViewChecked {
 

  @Input() products: any;
 
  constructor(@Inject(DOCUMENT) private document: Document) {
    
  };
  ngOnInit() {
   
  }  
  ngAfterViewChecked(): void {
    
  }
  onScrollFooter(){
    const a = document.getElementById('footer');
    a?.scrollIntoView({behavior: 'smooth'});
  }

}
