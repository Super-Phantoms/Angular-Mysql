import { Component, OnInit,Input } from '@angular/core';
import { StoreService } from 'src/app/service/StoreService/store.service';
import { HttpService } from 'src/app/service/http.service/http.service';
import { NgAxiosComponent } from 'src/app/service/ng-axios/ng-axios.component';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { getApiUrl } from 'src/app/service/utils';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  
 
  public ngAxios : any;
  public members: any;
  private url_team = getApiUrl('api/team/');
  constructor(public location: Location,private router: Router,public storeService: StoreService,public httpService: HttpService,private _snackBar: MatSnackBar,private sanitizer: DomSanitizer) {
    
    this.ngAxios = new NgAxiosComponent( this.httpService,_snackBar  );  
   
      this.ngAxios.ng_get(this.url_team, (data:any)=>{  
        data && data.map((item:any)=>{         
          item.summary = this.sanitizer.bypassSecurityTrustHtml(item.summary);
        })
        this.members = data;
      });

  
  }
 
  ngOnInit() {
   
  }  
}

