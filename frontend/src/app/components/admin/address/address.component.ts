import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/service/http.service/http.service';
import { NgAxiosComponent } from 'src/app/service/ng-axios/ng-axios.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getApiUrl } from 'src/app/service/utils';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})

export class AddressComponent {

  @Input() id: any;
  @Input() address: any;
  @Input() phone: any;
  @Input() mail: any;
  @Input() company_title: any;
  @Input() e_no: number;
  
  @Output() changeCompanyTitleEvent = new EventEmitter<string>();

  private ngAxios;

  public contact_url = getApiUrl('api/contact')

  constructor( public httpService: HttpService, private _snackBar: MatSnackBar){
    this.ngAxios = new NgAxiosComponent( httpService, _snackBar );
  }

  onChangeAddress = ( $event ) => {

    this.address = $event;
  }

  onChangePhone = ( $event ) => {
    
    this.phone = $event;
  }

  onChangeMail = ( $event ) => {
    
    this.mail = $event;
  }

  onChangeCompanyTitle = ( $event ) => {
    console.log('the event is occured in address')
    this.company_title = $event;
    this.changeCompanyTitleEvent.emit( $event );
  }

  onSaveClick = ( $event ) => {
    
    var data = {
      id: this.id,
      address: this.address,
      phone: this.phone,
      mail: this.mail,
      company_title: this.company_title,
    }

    this.ngAxios.ng_put(this.contact_url, data);
  }
}

