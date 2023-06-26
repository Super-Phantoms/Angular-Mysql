import { AfterViewInit, Component, OnInit,} from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service/http.service';
import { NgAxiosComponent } from 'src/app/service/ng-axios/ng-axios.component';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { getApiUrl } from 'src/app/service/utils';
import { DomSanitizer } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class BlogDetailComponent implements OnInit,AfterViewInit { 
  public currentPath: any;
  public mainMenus: any;
  public ngAxios : any;
  public blogId:any;
  public blog: any;
  public dates:any[]=[];
  public posts:any[]=[];
  private url_blog = getApiUrl('api/blog/detail/');
  constructor(public location: Location,private router: Router,public httpService: HttpService, private _snackBar: MatSnackBar,private sanitizer: DomSanitizer,private titleService: Title) {
    this.currentPath = location.path();  
    this.blogId = this.currentPath.match(/\d+/)[0];

   

  };

  ngOnInit() {
    this.ngAxios = new NgAxiosComponent( this.httpService ,this._snackBar);  
    let url = this.url_blog+this.blogId;
    let theThis = this;
    this.ngAxios.ng_get(url, (data:any)=>{
       data.data.map((item)=>{
          theThis.dates.push(item.postdt);
          theThis.posts.push(item.relpost);
        });
        theThis.dates = theThis.dates.map((date)=>{
          date = theThis.convertMonthDate(date);
          return date;
        })
        theThis.dates = [...new Set(theThis.dates)];
        theThis.posts = [...new Set(theThis.posts)];
        let img = data.blog.target_images;
        img = img.replace(/'/g, '"');
        img = JSON.parse(img);
        data.blog.target_images = img;  
        data.blog.target_postdt = this.convertDate(data.blog.target_postdt);
        this.blog = data.blog;
        
    });

  }
  ngAfterViewInit(){
    this.blog && this.titleService.setTitle(this.blog.target_title + " - ICS");
  }
  convertDate(date){
    const dateObj = new Date(date);
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const formattedDate = dateObj.toLocaleDateString('en-US',dateOptions);
    return formattedDate;
  }
  convertMonthDate(date){
    const dateObj = new Date(date);
      const dateOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
      };
      const formattedDate = dateObj.toLocaleDateString('en-US',dateOptions);
      return formattedDate;
  }
  
}
