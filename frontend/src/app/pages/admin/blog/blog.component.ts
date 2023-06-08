import { Component, ViewChild, OnInit, inject, Input } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/service/http.service/http.service';
import { StoreService } from 'src/app/service/StoreService/store.service';
import { NgAxiosComponent } from 'src/app/service/ng-axios/ng-axios.component';
import { ToastrComponent } from 'src/app/components/admin/toastr/toastr.component';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatStepperIntl } from '@angular/material/stepper';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ActivatedRoute } from '@angular/router';
import { getApiUrl } from 'src/app/service/utils';
import { SolutionViewLayout } from 'src/app/constants/types';

@Injectable()
export class StepperIntl extends MatStepperIntl {
  // the default optional label text, if unspecified is "Optional"
  // override optionalLabel = 'Optional Label';
}

import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from 'src/app/components/admin/modal-dialog/modal-dialog.component';
import { ConfirmDialogComponent } from 'src/app/components/admin/confirm-dialog/confirm-dialog.component';
import { AlarmDialogComponent } from 'src/app/components/admin/alarm-dialog/alarm-dialog.component';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';

export interface NewSectionDialogData {
  dialog_title: string;
  new_section_title: string;
  label_01: string;
  value_01: string;
  hasLabel_01: boolean;
}
export interface DeleteSectionDialogData {
  dialog_title: string;
  confirm_message: string;
}
export interface AlarmDialogData {
  dialog_title: string;
  alarm_message: string;
}



@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {

  @ViewChild('stepper', {static: false}) stepper;

  public selectedStepperIndex;
  public dt_records: any;
  public dt_records_count: any;
  public my_respond: any;
  public dt_intro: any = {
    id: 0,
    title: '',
    summary: '', 
    images: [{title: '', img: ''}],
    url: '',
    site_title: '',
    type: 0
  };
  public dt_article: any = {
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

  // public pgnator: any = {
  //   length: 100,
  //   pagesize: 10,
  //   pageSizeOptions: [5, 10, 25, 100], 
  //   ariaLabel: "Select page",
  // };






  public 
   /**
   *   accordition
   */
    panelOpenState = true;


   /**
   * main URL
   */
    public content_url = getApiUrl('api/blog');
    public intro_url = getApiUrl('api/service/intro')
    public catId;
    public cartId4Detail = 22; //BlogDetail Category ID

    private ngAxios;
    private toastr;
    private categories: Object[] = [];

    firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  
  constructor( public httpService: HttpService, 
               private _snackBar: MatSnackBar, 
               private route: ActivatedRoute, 
               public store: StoreService, 
               private _formBuilder: FormBuilder, 
               private dialog: MatDialog, /*private _matStepperIntl: MatStepperIntl*/){
                
    this.ngAxios = new NgAxiosComponent( httpService, _snackBar);
    this.toastr = new ToastrComponent(_snackBar);
    this.dt_records = new Array();
    this.selectedStepperIndex = 0;

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
      
      /**
       * Get and Load the Blog list...
       * content_url = getApiUrl('api/blog');
       */
      this.ngAxios.ng_get( `${this.content_url}/list`, ( data: any ) => {

        if( data == null || data.length == 0 ) {

          // this.dt_records.splice(0, this.dt_records.length);
          // this.createSection( 'New Section' );

        } else {
          var _dt_records = data.map((dt_record, index, array) => {

            var images = dt_record.images;
            var _images = [{title:'', img:''}];
            if(images) {
              images = images.replace(/'/g, '"');
              _images = JSON.parse(images);
            }
            console.log('The image data is convertied from string to object successfuly(content).');
           
            var summary = dt_record.summary;
            var _summary = '';
            if(summary) {
              _summary = summary.replace(/'/g, '"');
              _summary = _summary.replace(/!@#$%^&*()/g, "'");
            }

            var _dt_record = {
              id:      dt_record.id,
              title:   dt_record.title,
              subject: '',
              mobile_subject: '',
              summary: _summary,
              images:  _images,
              postdt:  dt_record.postdt,
              author:  dt_record.author,
              relpost: dt_record.relpost,
            }
            return _dt_record;
          })
          // this.stepper.reset();
          this.dt_records = _dt_records;
          // this.stepper.reset();
        }

        this.ngAxios.ng_get( `${this.intro_url}/${this.catId}`, ( data: any ) => {

          var images = data.images;
          var _images = [{title: '', img: ''}];
          if( images) {
            images = images.replace(/'/g, '"');
            _images = JSON.parse(images);
          }
          console.log('The image data is convertied from string to object successfuly(introduction).');

          var summary = data.summary;
          var _summary = '';
          if( summary ) {
            _summary = summary.replace(/'/g, '"');
            _summary = _summary.replace(/!@#$%^&*()/g, "'");
          }

          this.dt_intro = {
            id: data.id,
            title: data.title,
            summary: _summary,
            images: _images,
            url: data.url,
            site_title: data.site_title,
            type: data.type
          }

          this.ngAxios.ng_get( `${this.intro_url}/${this.cartId4Detail}`, ( data: any ) => {

            var images = data.images;
            var _images = [{title: '', img: ''}];
            if( images) {
              images = images.replace(/'/g, '"');
              _images = JSON.parse(images);
            }
            console.log('The image data is convertied from string to object successfuly(introduction).');
  
            var summary = data.summary;
            var _summary = '';
            if( summary ) {
              _summary = summary.replace(/'/g, '"');
              _summary = _summary.replace(/!@#$%^&*()/g, "'");
            }
  
            this.dt_article = {
              id: data.id,
              title: data.title,
              summary: _summary,
              images: _images,
              url: data.url,
              site_title: data.site_title,
              type: data.type
            }
          
          })
        
        })
      })

    });
  }

  

  deleteSection = ($event) => {
    if(this.dt_records.length <= 1) {
      this.toastr.error('This Section cannot be removed');
      return;
    }
    let _id = $event.id;
    let order = $event.e_no;

    this.ngAxios.ng_delete( `${this.content_url}/${_id}`, ( data: any ) => {
      this.dt_records.splice(order, 1);
    });
  }

  saveSection = ($event) => {
  }

  createSection = ($event) => {

    const currentDate = new Date();
    let postdt = currentDate.toLocaleString();

    const dialogRef = this.dialog.open(ModalDialogComponent, {
      height: '260px',
      width: '600px',
      data: {
          dialog_title: "Create New Post", 
          new_section_title: "New Post Title", 
          label_01: "Post Date: ", 
          value_01: postdt, 
          hasLabel_01: true
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if( result ) {

        let data = {
          title: result.new_section_title,
          postdt: result.value_01,
        };
    
        this.ngAxios.ng_post( `${this.content_url}`, data, ( data: any ) => {

          let _images = data.images;
          data.images = JSON.parse(_images);
    
          let postdt = new Date(data.postdt);
          data.postdt = postdt.toISOString();
    
          this.dt_records.unshift(data);
          
        });

      } else {

      }
    });
  };
}

