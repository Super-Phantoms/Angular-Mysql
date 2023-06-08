import { Component, ViewChild, OnInit, inject } from '@angular/core';
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


@Injectable()
export class StepperIntl extends MatStepperIntl {
  // the default optional label text, if unspecified is "Optional"
  // override optionalLabel = 'Optional Label';
}
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  @ViewChild('stepper', {static: false}) stepper;
  public selectedStepperIndex;

  constructor( public httpService: HttpService, private _snackBar: MatSnackBar, private route: ActivatedRoute, public storeService: StoreService, 
               private _formBuilder: FormBuilder, /*private _matStepperIntl: MatStepperIntl*/){
    this.ngAxios = new NgAxiosComponent( httpService, _snackBar);
    this.toastr = new ToastrComponent(_snackBar);
    this.dt_records = new Array();
    this.selectedStepperIndex = 0;
  }
  private ngAxios;
  private toastr;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  
  /**
   * main data store variables
   */
  public dt_records: any;
  public dt_records_count: any;
  public my_respond: any;

  /**
   * main UR
   */
  public url = getApiUrl('api/team');
  private catId;

  ngOnInit() {
      // params is an object containing the routing parameters
      
      // Do something with the parameter value
      this.ngAxios.ng_get(this.url, ( data: any ) => {
        if( data == null || data.length == 0 ) {

          this.dt_records.splice(0, this.dt_records.length);
          this.createSection( 'New First Name' );
  
        } else {
          var _dt_records = data.map((dt_record, index, array) => {
  
            var summary = dt_record.summary;
            var _summary = '';
            if( summary ) {
              _summary = summary.replace(/'/g, '"');
              _summary = _summary.replace(/!@#$%^&*()/g, "'");
            }

            var _dt_record = {
              id:      dt_record.id,
              firstName:   dt_record.firstName,
              summary:  _summary,
              img:    dt_record.image,
              lastName: dt_record.lastName,
              major:    dt_record.major
            }
            return _dt_record;
          })
          this.stepper.reset();
          this.dt_records = _dt_records;
          this.dt_records_count = this.dt_records.length;
          this.stepper.reset();
        }
      })
  }

  createSection = ( $event ) => {
    let data = {
      firstName: $event,
    };

    this.ngAxios.ng_post( `${this.url}`, data, ( data: any ) => {
      let _data = {
        id: data.id,
        firstName: data.firstName,
        lastName: '',
        major: '',
        summary: '',
        img: ''
      }
      this.dt_records.push(_data);

      // select the new step, last component...
      setTimeout(() => (this.stepper.selectedIndex = this.dt_records.length - 1), 0);
    });
  }

  deleteSection = ($event) => {
    if(this.dt_records.length <= 1) {
      this.toastr.error('This Member cannot be removed');
      return;
    }

    let _id = $event.id;
    let order = $event.e_no;

    this.ngAxios.ng_delete( `${this.url}/${_id}`, ( data: any ) => {
      this.dt_records.splice(order, 1);
    });
  }

  saveSection = ($event) => {
  }
}

