import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StoreService } from 'src/app/service/StoreService/store.service';

@Component({
  selector: 'app-single-image-upload',
  templateUrl: './single-image-upload.component.html',
  styleUrls: ['./single-image-upload.component.css']
})
export class SingleImageUploadComponent {

  @Input() img: any;
  @Input() title: any;
  @Input() s_no: any = 0;
  @Input() e_no: any;
  @Input() has_newBtn: any = false;
  // @Input() content_type: string = "introduction";
  @Input() must_hide_newBtn: any = true;
  @Input() show_image_title: any = true;
  @Input() is_image_title_multiline: any = false;
  @Input() backgroundColor: string = 'background-light';
  @Input() def_image_path: string = '/assets/images/select_image.png';

  @Output() createImgEvent = new EventEmitter<string>();
  @Output() updateImgEvent = new EventEmitter<string>();
  @Output() deleteImgEvent = new EventEmitter<string>();
  @Output() updateImgTitleEvent = new EventEmitter<string>();

  constructor() {}

  /**
   * Event handlers of front controls
   * @param $event 
   */
  _onLoadImg_AscAvnAdvs = ( $event: any ) => {
    let fileInput = $($event.target).parents('.image_card').find("input[type='file'][name='chgImage']");
    fileInput.trigger('click');
  }

  _onDel_AscAvnAdvs = ( $event: any ) => {
    $event = this.e_no;
    this.deleteImgEvent.emit( $event );
  }

  _onAdd_AscAvnAdvs = ( $event: any ) => {
    let fileInput = $($event.target).parents('.image_card').find("input[type='file'][name='newImage']");
    fileInput.trigger('click');
  }

  selectNewImage = ( $event: any ) => {
    var input = $event.target;

    let theThis = this;
    var reader = new FileReader();
    reader.onload = function(){
      $event.imageSrc = reader.result;
      theThis.createImgEvent.emit( $event );
    };
    reader.readAsDataURL(input.files[0]);
  }

  onChangeImgTitle = ( $event ) => {
    this.title = $event;

    $event = {
      e_no: this.e_no,
      title: this.title
    }
    this.updateImgTitleEvent.emit( $event );
  }

 
  /**
   * Event handlers of front hidden controls 
   * @param $event 
   */
  uploadFileHandler = ( $event: any ) => {
    var input = $event.target;

    let theThis = this;
    var reader = new FileReader();
    reader.onload = function(){
      var dataURL = reader.result;
      theThis.img = dataURL;

      $event = {
        e_no: theThis.e_no,
        img: dataURL,
        selectedFile: input.files[0],
      };

      theThis.updateImgEvent.emit( $event );
    };
    reader.readAsDataURL(input.files[0]);
  }
}

