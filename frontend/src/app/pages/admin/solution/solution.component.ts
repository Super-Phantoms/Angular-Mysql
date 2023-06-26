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
@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css']
})
export class SolutionComponent implements OnInit {

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
              private _formBuilder: FormBuilder, /*private _matStepperIntl: MatStepperIntl*/){
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
      
      // Do something with the parameter value
      this.ngAxios.ng_get( `${this.content_url}/${this.catId}`, ( data: any ) => {
        if( data == null || data.length == 0 ) {

          this.dt_records.splice(0, this.dt_records.length);
          this.createSection( 'New Section' );

        } else {
          var _dt_records = data.map((dt_record, index, array) => {
  
            var images = dt_record.images;
            images = images.replace(/'/g, '"');
            var _images = JSON.parse(images);
            for(let i = 0; i < _images.length; i++) {
              let imgTitle = _images[i].title;
              imgTitle = imgTitle.replace(/<BR>/g, '\n');
              _images[i].title = imgTitle;
            }
            console.log('The image data is convertied from string to object successfuly(content).');
  
            var subject = dt_record.subject;
            var _subject = '';
            if(subject) {
              _subject = subject.replace(/'/g, '"');
              _subject = _subject.replace(/!@#$%^&*()/g, "'");
            }

            var mobile_subject = dt_record.mobile_subject;
            var _mobile_subject = '';
            if(mobile_subject) {
              _mobile_subject = mobile_subject.replace(/'/g, '"');
              _mobile_subject = _mobile_subject.replace(/!@#$%^&*()/g, "'");
            }

            var summary = dt_record.summary;
            var _summary = '';
            if(summary) {
              _summary = summary.replace(/'/g, '"');
              _summary = _summary.replace(/!@#$%^&*()/g, "'");
            }

            var gallery = dt_record.gallery;
            var _gallery = gallery.toString();
  
            var _dt_record = {
              id:      dt_record.id,
              title:   dt_record.title,
              subject: _subject,
              mobile_subject: _mobile_subject,
              summary: _summary,
              images:  _images,
              media:   dt_record.media == null ? '' : dt_record.media,
              catId:   dt_record.catId,
              gallery: _gallery
            }
            return _dt_record;
          })
          this.stepper.reset();
          this.dt_records = _dt_records;
          this.dt_records_count = this.dt_records.length;
          this.stepper.reset();
        }

        this.ngAxios.ng_get( `${this.intro_url}/${this.catId}`, ( data: any ) => {

          var images = data.images;
          var _images = [{title: '', img: ''}];
          if( images) {
            images = images.replace(/'/g, '"');
            _images = JSON.parse(images);
          }
          for(let i = 0; i < _images.length; i++) {
            let imgTitle = _images[i].title;
            imgTitle = imgTitle.replace(/<BR>/g, '\n');
            _images[i].title = imgTitle;
          }
          console.log('The image data is convertied from string to object successfuly(content).');

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

      // select the new step, last component...
      setTimeout(() => (this.stepper.selectedIndex = this.dt_records.length - 1), 0);
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

}

