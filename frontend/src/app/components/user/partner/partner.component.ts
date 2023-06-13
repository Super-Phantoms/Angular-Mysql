import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getApiUrl } from 'src/app/service/utils';
import { HttpService } from 'src/app/service/http.service/http.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { NgAxiosComponent } from 'src/app/service/ng-axios/ng-axios.component';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})



export class PartnerComponent implements OnInit {
  public point1='E';
  public point2:string='';  
  public ngAxios : any;
  private url_partners = getApiUrl('api/partner/');
  // public tabId:any;  
  public partners:any[]=[];
  public mobile_partners:any[]=[];
  public tabList:any[]=[];
  constructor(public httpService: HttpService,private _snackBar: MatSnackBar) {
    this.point2 = this.getNextCharacter(this.point1);
    this.tabList.push('A-'+this.point1);
    this.tabList.push(this.point2+'-Z');
    this.ngAxios = new NgAxiosComponent( this.httpService,_snackBar ); 
    this.getPartnerData('A', this.point1);
  }
  ngOnInit() {
   
  }  
  nextPage(event){
      let str = event.target.textContent;
      str = str.split("-");
      // this.tabId = event.target.parentElement.dataset.tab;
      this.getPartnerData(str[0], str[1]);
  }
  getPartnerData(from,to){
    let url = this.url_partners + from + "/" + to; 
    let theThis = this;
    theThis.partners=[];
    this.ngAxios.ng_get(url, (data:any)=>{
      let newArray:any[]=[];
      let subArray:any[]=[];
      let newArray_mobile:any[]=[];
      let subArray_mobile:any[]=[];
      if(data){
        for (let i = 0; i < data.length; i += 3) {
          subArray = data.slice(i, i + 3);
          newArray.push(subArray);
        }   
        for (let i = 0; i < data.length; i += 2) {
          subArray_mobile = data.slice(i, i + 2);
          newArray_mobile.push(subArray_mobile);
        }  
        theThis.partners = newArray;
      theThis.mobile_partners = newArray_mobile;
      }
    })
  }
  getNextCharacter(point:string){
    let hexValue = point.charCodeAt(0).toString(16);
    let decimalValue = parseInt(hexValue, 16); // convert to decimal
    decimalValue +=1;
    let character = String.fromCharCode(decimalValue); // convert to character
    return character;
  }
}
