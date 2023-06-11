import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  @Input() dt_records: any;
  //  = [{
  //   id: 1,
  //   address: '',
  //   phone: '',
  //   mail: '',
  //   map: ''
  // }, {
  //   id: 2,
  //   address: '',
  //   phone: '',
  //   mail: '',
  //   map: ''
  // }]  
  
  constructor(){}

  changeCompanyTitle = ( $event ) => {
    console.log('ev:'+$event)
    if(this.dt_records) {
      this.dt_records[0].company_title = $event;
      this.dt_records[1].company_title = $event;
    }
  }

}



