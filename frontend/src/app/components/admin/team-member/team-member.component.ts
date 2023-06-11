import { Component, Input, Output, EventEmitter } from '@angular/core';
// ajax communitation related...
import { HttpService } from 'src/app/service/http.service/http.service';
import { StoreService } from 'src/app/service/StoreService/store.service';
import { NgAxiosComponent } from 'src/app/service/ng-axios/ng-axios.component';
// toastr notification related...
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ToastrComponent } from '../toastr/toastr.component';
// modal dialog related...
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AlarmDialogComponent } from '../alarm-dialog/alarm-dialog.component';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { formatCurrency } from '@angular/common';

export interface NewSectionDialogData {
  dialog_title: string;
  new_section_title: string;
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
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.css']
})
export class TeamMemberComponent {

  @Input() dt_record: any;
  @Input() dt_records: any;
  @Input() e_no: any;
  @Input() has_newBtn: any = false;
  @Input() url: any;

  @Output() createSectionEvent = new EventEmitter<string>();
  @Output() deleteSectionEvent = new EventEmitter<string>();
  @Output() saveSectionEvent   = new EventEmitter<string>();

  constructor( private dialog: MatDialog, public httpService: HttpService, private _snackBar: MatSnackBar){
    this.ngAxios = new NgAxiosComponent( httpService, _snackBar );
    this.toastr = new ToastrComponent(_snackBar);
  }
  private ngAxios;
  private toastr;

  /**
   * file upload for Introduction Video (Media URL) 
   */
  selectedFile: File | null = null;
  cur_progress: number = 0;
  progressbar_show: string = "pgbar_hide";
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';

  /**
   * main URL
   * private url = getApiUrl('api/service');
   */

  /**
   * Event handlers of front control
   * @param $event 
   */

  _onClickSave = ($event) => {
    this.save_and_uploadFile();
  };
    
  _onClickCreate = ($event) => {
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: {dialog_title: "Create New Member", new_section_title: "Fisrt Name"},
      height: '230px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if( result ) {
        $event = result;
        this.createSectionEvent.emit( $event );
      } else {

      }
    });
  };

  _onClickDelete = ($event) => {

    if( this.dt_records.length <= 1 ) {
      const alarmDialogRef = this.dialog.open(AlarmDialogComponent, {
        data: {dialog_title: "Alarm", alarm_message: "You can't delete last one member. "},
        height: '230px',
        width: '600px',
      });
  
      alarmDialogRef.afterClosed().subscribe(result => {
        if( result ) {} else {}
      });

    } else {

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {

        data: {dialog_title: "Delete Member dialog", confirm_message: "Do you want to delete this member?"},
        height: '230px',
        width: '600px',

      });
  
      dialogRef.afterClosed().subscribe(result => {

        if( result ) {
          $event = {
            id: this.dt_record.id,
            e_no: this.e_no
          }

          this.deleteSectionEvent.emit( $event );

        } else { return; }
      });
    }
  };

  /**
   * Event receiver functions from child Component
   * @param $event 
   */
  updateSummary(editor_data) {
    this.dt_record.summary = editor_data;
  }

  updateFirstName = ( $event ) => {
    this.dt_record.firstName = $event;
  }

  updateLastName = ( $event ) => {
    this.dt_record.lastName = $event;
  }

  updateMajor = ( $event ) => {
    this.dt_record.major = $event;
  }

  updateMedia = ( $event ) => {
    this.dt_record.media = $event;
  }

  updateGallery = ( $event ) => {

    console.log('gallery:'+$event);
    this.dt_record.gallery = $event;
  }

  updateImage( $event: any) {

    let img = $event.img
    this.dt_record.img = img
  }

  updateImageTitle = ( $event ) => {
    
    const { e_no, title } = $event;
    this.dt_record.images[e_no].title = title;
  }

  createImage( $event: any) {

    let new_img = {
      title: 'New Image',
      img: ''
    }
    this.dt_record.images.push( new_img );
  }

  deleteImage( $event: any) {

    if(this.dt_record.images.length <= 1) {
      this.toastr.error('This image pad cannot be removed');
      return;
    }

    let order = $event;
    this.dt_record.images.splice(order, 1);
  }

  updateFile( $event: any ) {
    this.selectedFile = $event;
  }

  save_and_uploadFile = () => {
    // convert the JSON object to String object
    let _summary = this.dt_record.summary;
    console.log('old summary=' + _summary);

    _summary = _summary.replace(/'/g, "!@#$%^&*()");
    _summary = _summary.replace(/"/g, "'");

    var _dt_record = {
      id: this.dt_record.id,
      firstName: this.dt_record.firstName,
      lastName: this.dt_record.lastName,
      summary: _summary,
      image: this.dt_record.img,
      major: this.dt_record.major
    }

    this.ngAxios.ng_put(this.url, _dt_record);
  }
}
