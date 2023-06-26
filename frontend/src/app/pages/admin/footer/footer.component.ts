import { Component, ViewChild, OnInit, inject, Input } from '@angular/core';
import { HttpService } from 'src/app/service/http.service/http.service';
import { StoreService } from 'src/app/service/StoreService/store.service';
import { NgAxiosComponent } from 'src/app/service/ng-axios/ng-axios.component';
import { ToastrComponent } from 'src/app/components/admin/toastr/toastr.component';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ActivatedRoute } from '@angular/router';
import { getApiUrl } from 'src/app/service/utils';
import { SolutionViewLayout } from 'src/app/constants/types';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  public dt_records: any;
  public dt_records_count: any;

  public dt_record: any = {
    id: 0,
    title: '',
    summary: '',
    images: [{title: '', img: ''}],
    media: '',
    catId: 19,
    gallery: 0
  }
  public dt_intro: any = {
    id: 0,
    title: '',
    subject: '',
    mobile_subject: '',
    summary: '', 
    images: [{title: '', img: ''}],
    url: '',
    site_title: '',
    type: 0
  };

   /**
   *   accordition
   */
    panelOpenState = false;


   /**
   * main URL
   */
    public content_url = getApiUrl('api/service/content');
    public intro_url = getApiUrl('api/service/intro')
    public catId;

    private ngAxios;
    private toastr;
    private categories: Object[] = [];
  
  constructor( public httpService: HttpService, 
              private _snackBar: MatSnackBar, 
              private route: ActivatedRoute, 
              public store: StoreService, 
              private _formBuilder: FormBuilder){
    this.ngAxios = new NgAxiosComponent( httpService, _snackBar);
    this.toastr = new ToastrComponent(_snackBar);
    this.dt_records = new Array();

    this.store.categories$.subscribe((categories) => {
      Object.assign(this.categories, categories);
      const cur_category = this.categories.find((cat: any) => cat.id == this.catId);
      cur_category && this.store.updateCurrentCategory(cur_category);
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // params is an object containing the routing parameters
      this.catId = params['sid'];
      const cur_category = this.categories.find((cat: any) => cat.id == this.catId);
      cur_category && this.store.updateCurrentCategory(cur_category);
      
      // Do something with the parameter value
      this.ngAxios.ng_get( `${this.content_url}/${this.catId}`, ( data: any ) => {

        if( data == null || data.length == 0 ) {

          // this.dt_records.splice(0, this.dt_records.length);
          this.createSection( 'New Section' );

        } else {
          let _data = data[0];

          var images = _data.images;
          var _images = [{title: '', img: ''}];
          if( images) {
            images = images.replace(/'/g, '"');
            _images = JSON.parse(images);
          }
          console.log('The image data is convertied from string to object successfuly(introduction).');

          var subject = _data.subject;
          var _subject = '';
          if( subject ) {
            _subject = subject.replace(/'/g, '"');
            _subject = _subject.replace(/!@#$%^&*()/g, "'");
          }

          var mobile_subject = _data.mobile_subject;
          var _mobile_subject = '';
          if( mobile_subject ) {
            _mobile_subject = mobile_subject.replace(/'/g, '"');
            _mobile_subject = _mobile_subject.replace(/!@#$%^&*()/g, "'");
          }


          var summary = _data.summary;
          var _summary = '';
          if( summary ) {
            _summary = summary.replace(/'/g, '"');
            _summary = _summary.replace(/!@#$%^&*()/g, "'");
          }

          this.dt_record = {
            id: _data.id,
            title: _data.title,
            subject: _subject,
            mobile_subject: _mobile_subject,
            summary: _summary,
            images: _images,
            media: _data.media,
            catId: _data.catId,
            gallery: _data.gallery
          }

          console.log(this.dt_record);
        }

        this.ngAxios.ng_get( `${this.intro_url}/${this.catId}`, ( data: any ) => {

          var images = data.images;
          var _images = [{title: '', img: ''}];
          if( images) {
            images = images.replace(/'/g, '"');
            _images = JSON.parse(images);
          }
          console.log('The image data is convertied from string to object successfuly(introduction).');

          var subject = data.subject;
          var _subject = '';
          if( subject ) {
            _subject = subject.replace(/'/g, '"');
            _subject = _subject.replace(/!@#$%^&*()/g, "'");
          }

          var mobile_subject = data.mobile_subject;
          var _mobile_subject = '';
          if( mobile_subject ) {
            _mobile_subject = mobile_subject.replace(/'/g, '"');
            _mobile_subject = _mobile_subject.replace(/!@#$%^&*()/g, "'");
          }

          var summary = data.summary;
          var _summary = '';
          if( summary ) {
            _summary = summary.replace(/'/g, '"');
            _summary = _summary.replace(/!@#$%^&*()/g, "'");
          }

          this.dt_intro = {
            id: data.id,
            title: data.title,
            subject: _subject,
            mobile_subject: _mobile_subject,
            summary: _summary,
            images: _images,
            url: data.url,
            site_title: data.site_title,
            type: data.type
          }
        
        })
      })

    });
  }

  createSection = ( $event ) => {

    let data = {
      catId: this.catId,
      title: $event.new_section_title,
    };

    this.ngAxios.ng_post( `${this.content_url}`, data, ( data: any ) => {
      let _images = data.images;
      data.images = JSON.parse(_images);
      this.dt_records.push(data);
    });
  }

  deleteSection = ($event) => {

  }

  saveSection = ($event) => {

  }


}

