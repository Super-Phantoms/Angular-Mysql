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
import { SolutionViewLayout } from '../../../constants/types'

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
  selector: 'app-dtmng-section',
  templateUrl: './dtmng-section.component.html',
  styleUrls: ['./dtmng-section.component.css']
})
export class DtmngSectionComponent {

  @Input() dt_record: any;
  @Input() dt_records: any;
  @Input() e_no: any;
  @Input() has_newBtn: any = false;
  @Input() url: any;

  @Input() panel_layout_way: any = SolutionViewLayout.both;

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
    this.progressbar_show = "pgbar_show";
    this.save_and_uploadFile();
  };
    
  _onClickCreate = ($event) => {
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: {dialog_title: "Create New Section", new_section_title: "New Section"},
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
        data: {dialog_title: "Alarm", alarm_message: "You can't delete last one section. "},
        height: '230px',
        width: '600px',
      });
  
      alarmDialogRef.afterClosed().subscribe(result => {
        if( result ) {} else {}
      });

    } else {

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {

        data: {dialog_title: "Delete section dialog", confirm_message: "Do you want to delete this section?"},
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
  updateSubject(editor_data) {
    this.dt_record.subject = editor_data;
  }

  updateMobileSubject(editor_data) {
    this.dt_record.mobile_subject = editor_data;
  }

  updateSummary(editor_data) {
    this.dt_record.summary = editor_data;
  }

  updateTitle = ( $event ) => {
    this.dt_record.title = $event;
  }

  updateMedia = ( $event ) => {
    this.dt_record.media = $event;
  }

  updateGallery = ( $event ) => {

    console.log('gallery:'+$event);
    this.dt_record.gallery = $event;
  }

  updateImage( $event: any) {

    let order = $event.e_no;
    let img = $event.img

    this.dt_record.images[order].img = img
  }

  updateImageTitle = ( $event ) => {
    
    const { e_no, title } = $event;
    this.dt_record.images[e_no].title = title;
  }

  createImage( $event: any) {
    let new_img = {
      title: 'New Image',
      img: $event.imageSrc
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
    let _images = JSON.stringify(this.dt_record.images);
    _images = _images.replace(/"/g, "'");

    let subject = this.dt_record.subject;
    let _subject = '';
    if( subject ) {
      _subject = subject.replace(/'/g, "!@#$%^&*()");
      _subject = _subject.replace(/"/g, "'");
    }

    let mobile_subject = this.dt_record.mobile_subject;
    let _mobile_subject = '';
    if( mobile_subject ) {
      _mobile_subject = mobile_subject.replace(/'/g, "!@#$%^&*()");
      _mobile_subject = _mobile_subject.replace(/"/g, "'");
    }

    let _summary = this.dt_record.summary;
    _summary = _summary.replace(/'/g, "!@#$%^&*()");
    _summary = _summary.replace(/"/g, "'");

    let _gallery = parseInt(this.dt_record.gallery);

    var formData = new FormData();
    formData.append('id', this.dt_record.id);
    formData.append('title', this.dt_record.title);
    formData.append('subject', _subject);
    formData.append('mobile_subject', _mobile_subject);

    formData.append('summary', _summary);
    formData.append('images', _images);
    formData.append('media', this.dt_record.media == null ? '' : this.dt_record.media);
    formData.append('catId', this.dt_record.catId);
    formData.append('gallery', _gallery.toString());

    if (this.selectedFile != null) {
      formData.append('intro_media', this.selectedFile); 
    }

    this.ngAxios.ng_upload(this.url, formData, ( progress: any ) => {
      this.cur_progress = progress;
      if(this.cur_progress == 100) {
        this.cur_progress = 0;
        this.progressbar_show = "pgbar_hide";
        this.selectedFile = null;
      }
    }, ( event ) => {
      this.dt_record.media = event.body.data.media;
    });
  }

  solutionTextViewLayout = (way) => {
    // debugger;
    if(way == SolutionViewLayout.both) {
      return "col-lg-6 col-md-6 col-sm-6 srvcontent_title_panel";
    } else if(way == SolutionViewLayout.only_txt) {
      return "col-lg-12 col-md-12 col-sm-12 srvcontent_title_panel";
    } else {
      return "display_done";
    }
  }

  solutionImageViewLayout = (way) => {
    // debugger
    if(way == SolutionViewLayout.both) {
      return "col-lg-6 col-md-6 col-sm-6 srvcontent_image_panel";
    } else if(way == SolutionViewLayout.only_img) {
      return "col-lg-12 col-md-12 col-sm-12 srvcontent_image_panel";
    } else {
      return "display_done";
    }
  }
}
