import { AfterViewInit, Component, OnInit,Renderer2} from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service/http.service';
import { NgAxiosComponent } from 'src/app/service/ng-axios/ng-axios.component';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { getApiUrl } from 'src/app/service/utils';
import { DomSanitizer } from '@angular/platform-browser';
import { StoreService } from 'src/app/service/StoreService/store.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit ,AfterViewInit{ 
  public currentPath: any;
  public mainMenus: any;
  public ngAxios : any;
  public blogs: any[]=[];
  public dates: any[]=[];
  public posts: any[]=[];
  public currentPage: number = 1;
  public itemsPerPage: number = 5;
  public totalItems: number = 0;
  public real_total: number=0;
  public pageSize: number[] = [5, 10, 15, 20, 30, 50, 100];
  private url_paginate = getApiUrl('api/blog/paginate/');
  constructor(public location: Location,private router: Router,public httpService: HttpService,public storeService: StoreService, private _snackBar: MatSnackBar,private sanitizer: DomSanitizer,private renderer: Renderer2) {
    this.currentPath = location.path(); 
   
    this.ngAxios = new NgAxiosComponent( this.httpService ,_snackBar);  
    let theThis = this;
    this.getBlogData(this.currentPage, this.itemsPerPage,{});   
  };

  ngOnInit() {
    this.storeService.blogs$.subscribe((blogs:any)=>{
      this.blogs = blogs;
    })
  }
  ngAfterViewInit(): void {
    if(this.currentPath.includes('postdt')){
      let postdt = this.currentPath.split("=")[1];
      postdt = postdt.replace(/%20/g, ' ');
      let condition = {'postdt':postdt};
      this.getBlogDataWithCondition(condition);
    }
    else if(this.currentPath.includes('post')){
      let tag = this.currentPath.split("=")[1];
      tag = tag.replace(/%20/g, ' ');
      let condition = {'relpost':tag};
      this.getBlogDataWithCondition(condition);
    }
    else if(this.currentPath.includes('author')){
      let author = this.currentPath.split("=")[1];
      author = author.replace(/%20/g, ' ');
      this.filterAuthor(author);
    }
    else if(this.currentPath.includes('monthdt')){
      let date = this.currentPath.split("=")[1];
      date  = date.replace(/%20/g, ' ');
      let condition = {'postdt':date};
      this.getBlogDataWithCondition(condition);
    }
    const paginationButtons = document.querySelectorAll('.pagination .current');
    paginationButtons.forEach(button => {
      this.renderer.setStyle(button, 'background-color', 'red');
    });
   
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
  convertRealDate(date){
    let dateObj = new Date(date);
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    let month_str='';
    let day_str='';
    if (month < 10) 
      month_str = '0' + month;
    else
      month_str = month.toString();
    let day = dateObj.getDate();
    if (day < 10)
      day_str = '0' + day;
    else
      day_str = day.toString();
    let formattedDate = year + '-' + month_str + '-' + day_str;
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
  convertRealMonthDate(date){
    let dateObj = new Date(date);
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    let month_str='';
   
    if (month < 10) 
      month_str = '0' + month;
    else
      month_str = month.toString();
   
    let formattedDate = year + '-' + month_str ;
    return formattedDate;
  }
 
  searchPost(){
    let condition = {};
    this.getBlogDataWithCondition(condition);   
  }
  filterPostTags(event){
    let tag = event.target.text;
    var search_key = jQuery("#searchInput").val();
    tag = tag.trim();
    let condition = {'relpost':tag};
    this.getBlogDataWithCondition(condition);
  }
  
  filterFullDate(event){
    var search_key = jQuery("#searchInput").val();
    let date = event.target.textContent;
    date = date.trim();
    date = this.convertRealDate(date);
    let condition = {'postdt':date};
    this.getBlogDataWithCondition(condition);
  }
 
  filterMonthDate(event){
    var search_key = jQuery("#searchInput").val();
    let date = event.target.text;
    date = date.trim();
    date = this.convertRealMonthDate(date);
    let condition = {'postdt':date};
    this.getBlogDataWithCondition(condition);
  }  
  filterAuthor(author){
    let condition = {'author':author};
    this.getBlogDataWithCondition(condition);
  }
  getBlogDataWithCondition(condition){
    this.currentPage = 1;
    this.getBlogData(this.currentPage,this.itemsPerPage,condition);
  }
  onTableDataChange(event:any){
    this.currentPage  = event;
    this.getBlogData(this.currentPage,this.itemsPerPage,{});
  }
  onTableSizeChange(event:any): void {
    this.itemsPerPage = event.target.value;
    this.currentPage = 1;
    this.getBlogData(this.currentPage,this.itemsPerPage,{});
  }
  getBlogData(page,limit,condition){  
    let searchKey:any = $("#searchInput").val();
    if(searchKey == undefined)
      searchKey = '';
    let theThis = this;  
    let cond = '';
    if(Object.keys(condition).length == 0)
      cond = '';
    else
      cond = JSON.stringify(condition);
    let url = this.url_paginate+page+"/"+limit+"/"+searchKey;
    this.ngAxios.ng_get(url,(data:any)=>{
      if(data.data == null){
        data.data=[];
        theThis.blogs = [];
        theThis.totalItems = 0;
      }
      else{
       
        data.data.data.map((item:any)=>{
          if(item){
           let img = item.images;
           img = img.replace(/'/g, '"');
           img = JSON.parse(img);
           item.images = img;  
                     
           item.postdt = this.convertDate(item.postdt);
           
          }
         })
         data.dateAndPosts.map((item:any)=>{
          if(item){
            let date  = this.convertMonthDate(item.postdt);
            theThis.dates.push(date);
            theThis.dates = [...new Set(theThis.dates)]; 
            theThis.posts.push(item.relpost);
            theThis.posts = [...new Set(theThis.posts)]; 
          }
         })
         
         theThis.blogs = data.data.data;       
         this.totalItems = data.data.search_total;
         this.real_total = data.totalCount;
      }
      
      
    },null,cond);
  }
 
}
