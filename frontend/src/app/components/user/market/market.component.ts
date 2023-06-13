import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {
  @Input() markets:any;
  ngOnInit() {
   
  }  

}
