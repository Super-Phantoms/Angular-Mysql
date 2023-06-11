import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/service/http.service/http.service';
import { StoreService } from 'src/app/service/StoreService/store.service';
import { NgAxiosComponent } from 'src/app/service/ng-axios/ng-axios.component';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ToastrComponent } from '../toastr/toastr.component';
import { MatDialog } from '@angular/material/dialog';
import { SolutionViewLayout } from '../../../constants/types'

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
  selector: 'app-intro-section',
  templateUrl: './intro-section.component.html',
  styleUrls: ['./intro-section.component.css']
})
export class IntroSectionComponent {

  @Input() dt_record: any= {
    id: 0,
    title: '',
    subject: '', //reserve field
    mobile_subject: '',
    summary: '', 
    images: [{title: '', img: ''}],
    url: '',
    site_title: '',
    type: 0
  };
  @Input() url: any;
  
  @Input() panel_layout_way: any = SolutionViewLayout.both;

  public must_hide_img_newBtn: any = false;

  constructor( private dialog: MatDialog, public httpService: HttpService, private _snackBar: MatSnackBar, private store: StoreService){
    this.ngAxios = new NgAxiosComponent( httpService, _snackBar );
    this.toastr = new ToastrComponent(_snackBar);

    this.store.currentCategory$.subscribe((currentCategory: any) => {
      console.log('currentCategory changed = ' + currentCategory)
      if(currentCategory.id == 1) {
        this.must_hide_img_newBtn = false;
      } else {
        this.must_hide_img_newBtn = true;
      }
    });
  }
  private ngAxios;
  private toastr;

  /**
   * main URL
   * private url = getApiUrl('api/service');
   */

  /**
   * Event handlers of front control
   * @param $event 
   */

  _onClickSave = ($event) => {
    // this.progressbar_show = "pgbar_show";
    this.save_and_uploadFile();
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

  save_and_uploadFile = () => {
    // replace enter character('\n') of each image's title to '<BR>' 
    // image's title can include enter character('\n') because of text area element
    let arrImages = this.dt_record.images;
    for(let i = 0; i < arrImages.length; i++) {
      let imgTitle = arrImages[i].title;
      imgTitle = imgTitle.replace(/\n/g, "<BR>");
      arrImages[i].title = imgTitle;
    }
    // convert the JSON object of image array to String object
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

    let summary = this.dt_record.summary;
    let _summary = '';
    if( summary ) {
      _summary = summary.replace(/'/g, "!@#$%^&*()");
      _summary = _summary.replace(/"/g, "'");
    }

    var data = {
      id: this.dt_record.id,
      title: this.dt_record.title,
      subject: _subject,
      mobile_subject: _mobile_subject,
      summary: _summary,
      images: _images,
      url: this.dt_record.url,
      site_title: this.dt_record.site_title,
      type: this.dt_record.type,
    
    };

    this.ngAxios.ng_put(this.url, data, () => {
      let arrImages = this.dt_record.images;
      for(let i = 0; i < arrImages.length; i++) {
        let imgTitle = arrImages[i].title;
        imgTitle = imgTitle.replace(/<BR>/g, "\n");
        arrImages[i].title = imgTitle;
      }
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

