import { Component, OnInit,AfterViewInit } from '@angular/core';
import { StoreService } from 'src/app/service/StoreService/store.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { getApiUrl } from 'src/app/service/utils';
import { NgAxiosComponent } from 'src/app/service/ng-axios/ng-axios.component';
import { HttpService } from 'src/app/service/http.service/http.service';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-userfooter',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class UserFooterComponent implements OnInit {
  public currentPath: any;
  public footMenus: any[]=[];
  public ngAxios : any;
  public address1:any;
  public address2:any;
  private url_contact = getApiUrl('api/contact');
  constructor(public location: Location,private router: Router,public httpService: HttpService,private _snackBar: MatSnackBar,public storeService: StoreService) {
    this.ngAxios = new NgAxiosComponent( this.httpService,_snackBar );  
    this.currentPath = location.path();
    this.storeService.data$.subscribe((data)=>{
      for(let i=0; i< Object.keys(data).length;i++){
        if( data[i].type == '8' || data[i].type == '9'){
          this.footMenus.push(data[i]);        
        }
      }
      let theThis = this;
      if(Object.keys(data).length > 0){
        this.ngAxios.ng_get(this.url_contact, (data:any)=>{
          if(data){
            theThis.address1 = data[0];
            theThis.address1.address = theThis.address1.address.replace(/\n/g, '<br>');
            theThis.address2 = data[1];
            theThis.address2.address = theThis.address2.address.replace(/\n/g, '<br>');
          }
          
        })
      }      
    })
  }
  ngOnInit() {
   
  }
 

}
