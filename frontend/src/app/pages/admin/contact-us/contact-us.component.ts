import { Component, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/service/http.service/http.service';
import { StoreService } from 'src/app/service/StoreService/store.service';
import { NgAxiosComponent } from 'src/app/service/ng-axios/ng-axios.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { getApiUrl } from 'src/app/service/utils';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  @ViewChild('stepper', {static: false}) stepper;

  public dt_records: any = [{
    id: 1,
    address: '',
    phone: '',
    mail: '',
    company_title: ''
  }, {
    id: 2,
    address: '',
    phone: '',
    mail: '',
    company_title: ''
  }]  
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
   * main URL
  */
  public contact_url = getApiUrl('api/contact');
  public intro_url = getApiUrl('api/service/intro')
  public catId = 16

  private ngAxios;
  private categories: Object[] = [];

  constructor( public httpService: HttpService, 
              private _snackBar: MatSnackBar, 
              private route: ActivatedRoute, 
              public store: StoreService, 
              private _formBuilder: FormBuilder, /*private _matStepperIntl: MatStepperIntl*/){
    this.ngAxios = new NgAxiosComponent( httpService, _snackBar);

    this.store.categories$.subscribe((categories) => {
      Object.assign(this.categories, categories);
      const cur_category = this.categories.find((cat: any) => cat.id == this.catId);
      cur_category && this.store.updateCurrentCategory(cur_category);
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // params is an object containing the routing parameters
      // this.catId = params['sid'];
      const cur_category = this.categories.find((cat: any) => cat.id == this.catId);
      cur_category && this.store.updateCurrentCategory(cur_category);
      // Do something with the parameter value
      this.ngAxios.ng_get( this.contact_url, ( data: any ) => {
        if( data == null || data.length == 0 ) {

          this.dt_records = 
            [{
              id: 1,
              address: '',
              phone: '',
              mail: '',
              company_title: ''
            }, {
              id: 2,
              address: '',
              phone: '',
              mail: '',
              company_title: ''
            }]  

        } else {
          this.dt_records = data;
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
        })
      })
    });
  }
}

