import { Component } from '@angular/core';
import { HttpService } from 'src/app/service/http.service/http.service';
import { StoreService } from 'src/app/service/StoreService/store.service';
import { NgAxiosComponent } from 'src/app/service/ng-axios/ng-axios.component';
import { ToastrComponent } from 'src/app/components/admin/toastr/toastr.component';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

import { getApiUrl } from 'src/app/service/utils';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent {

  public partner_list: any;
  public partner_url = getApiUrl('api/partner')

  private ngAxios;
  private toastr;

  public cols = 1;
  public rows = 1;

  constructor( public httpService: HttpService, 
               private _snackBar: MatSnackBar, ){
    this.ngAxios = new NgAxiosComponent( httpService, _snackBar);
    this.toastr = new ToastrComponent(_snackBar);
    this.partner_list = new Array();
  }

  ngOnInit() {
    this.ngAxios.ng_get( `${this.partner_url}/a/z`, ( data: any ) => {

      if( data == null || data.length == 0 ) {

      } else {
        this.partner_list = data;
      }
    });
  }

  partnerDelete = ( $event ) => {
    let order = $event;
    this.partner_list.splice(order, 1);
  }

  onAddPartner = ( $event ) => {

    // Create the file input element
    const fileInput = document.createElement('input');

    // Set attributes and properties
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('name', 'newPartner');
    fileInput.setAttribute('id', 'newPartnerInput');
    fileInput.style.display = 'none';
    fileInput.addEventListener('change', this.handleFileInputChange);

    let btnEl = $event.target.closest('button');
    btnEl.parentNode.appendChild(fileInput);

    fileInput.click();
    let el_appPartner = document.getElementsByClassName('addPartner')[0];
    let el_addBtn = el_appPartner.getElementsByClassName('mat-mdc-button-base')[0];
    if(document.activeElement == el_addBtn)
      (document.activeElement as HTMLElement).blur()
  }

  handleFileInputChange = ( $event ) => {
    var input = $event.target;
  
      let theThis = this;
      var reader = new FileReader();
      reader.onload = function(){
        var dataURL = reader.result;

        let data = {
          img: dataURL,
        }
        theThis.ngAxios.ng_post( theThis.partner_url, data, ( data: any ) => {
          theThis.partner_list.push(data)
        });

        const element = document.getElementById('newPartnerInput');
        if(element) {
          element.remove();
        }
      };
      reader.readAsDataURL(input.files[0]);
  }
}
