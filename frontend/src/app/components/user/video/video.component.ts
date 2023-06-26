import { Component, OnInit,Input,AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit,AfterViewChecked {
 
  @Input() video: any;
  constructor() {
    
  }
  ngOnInit() {
   
  }  
  ngAfterViewChecked(){
    
    // let iframe:any = document.getElementById("video-iframe");
    //  iframe.src = '/video/'+this.video.media+'?autoplay=1&amp;color&amp;autopause=0&amp;loop=1&amp;muted=0&amp;title=0&amp;portrait=0&amp;byline=0#t=';
  }

}
