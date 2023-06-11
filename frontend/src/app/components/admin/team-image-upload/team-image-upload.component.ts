import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-team-image-upload',
  templateUrl: './team-image-upload.component.html',
  styleUrls: ['./team-image-upload.component.css']
})
export class TeamImageUploadComponent {

  @Input() img: any;
  @Input() title: any;
  @Input() s_no: any;
  @Input() e_no: any;
  @Input() has_newBtn: any = false;

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
    let fileInput = $($event.target).parents('.image_card').find("input[type='file']");
    fileInput.trigger('click');
  }

  _onDel_AscAvnAdvs = ( $event: any ) => {
    $event = this.e_no;
    this.deleteImgEvent.emit( $event );
  }

  _onAdd_AscAvnAdvs = ( $event: any ) => {
    this.createImgEvent.emit( $event );
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
        img: dataURL
      };

      theThis.updateImgEvent.emit( $event );
    };
    reader.readAsDataURL(input.files[0]);
  }
}
