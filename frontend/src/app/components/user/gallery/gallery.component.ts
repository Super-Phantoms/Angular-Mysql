import { Component, OnInit,Input } from '@angular/core';
import { StoreService } from 'src/app/service/StoreService/store.service';
import { HttpService } from 'src/app/service/http.service/http.service';
import { NgAxiosComponent } from 'src/app/service/ng-axios/ng-axios.component';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { getApiUrl } from 'src/app/service/utils';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input() gallery: any;
  public currentPath;
  constructor(public location: Location,private router: Router,public storeService: StoreService,public httpService: HttpService, private _snackBar: MatSnackBar) {
    this.currentPath = location.path(); 
  }
  ngOnInit() {
   
  }  

}
