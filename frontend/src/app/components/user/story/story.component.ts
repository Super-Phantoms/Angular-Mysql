import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  @Input() services: any;
  ngOnInit() {
   
  }  

}
