import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/service/http.service/http.service';
import { StoreService } from 'src/app/service/StoreService/store.service';
import { NgAxiosComponent } from 'src/app/service/ng-axios/ng-axios.component';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ToastrComponent } from '../toastr/toastr.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

export interface DeleteSectionDialogData {
  dialog_title: string;
  confirm_message: string;
}


@Component({
  selector: 'app-partner-brands',
  templateUrl: './partner-brands.component.html',
  styleUrls: ['./partner-brands.component.css']
})

export class PartnerBrandsComponent {

  @Input() id: any;
  @Input() title: any = 'Partner Brand'
  @Input() img: any = '';
  @Input() url: string;
  @Input() e_no: number;

  @Output() partnerDeleteEvent = new EventEmitter<string>();

  private ngAxios;
  private toastr;

  constructor( private dialog: MatDialog, public httpService: HttpService, private _snackBar: MatSnackBar){
    this.ngAxios = new NgAxiosComponent( httpService, _snackBar );
    this.toastr = new ToastrComponent(_snackBar);
  }

  onChangeImageTitle = ( $event ) => {

    this.title = $event;
  }

  onLoadImg = ( $event ) => {
    let fileInput = $($event.target).parents('.partner_card').find("input[type='file']");
    fileInput.trigger('click');
  }

  onChageImage = ( $event ) => {

    var input = $event.target;

    let theThis = this;
    var reader = new FileReader();
    reader.onload = function(){
      var dataURL = reader.result;
      theThis.img = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
  }

  onSavePartner = ( $event ) => {
    var data = {
      id: this.id,
      title: this.title,
      img: this.img,
    };

    this.ngAxios.ng_put(this.url, data);
  }

  onDeletePartner = ( $event ) => {
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {

      data: {dialog_title: "Partner Brand Delete dialog", confirm_message: "Do you want to delete this partner brand?"},
      height: '230px',
      width: '600px',

    });

    dialogRef.afterClosed().subscribe(result => {
      if( result ) {
        this.ngAxios.ng_delete(`${this.url}/${this.id}`, (data) => {
          $event = this.e_no;
          this.partnerDeleteEvent.emit( $event );
        });

      } else { return; }
    });
  }


}
