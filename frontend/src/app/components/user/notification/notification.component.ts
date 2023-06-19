import { Component, OnInit ,Input} from '@angular/core';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() groupData:any[]=[];
  constructor() {   
   
  }
  ngOnInit() {
   
  }  
  onScrollFooter(){
    const a = document.getElementById('footer');
    a?.scrollIntoView({behavior: 'smooth'});
  }

}
