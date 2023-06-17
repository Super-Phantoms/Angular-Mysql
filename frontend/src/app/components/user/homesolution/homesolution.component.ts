import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-homesolution',
  templateUrl: './homesolution.component.html',
  styleUrls: ['./homesolution.component.scss']
})
export class HomeSolutionComponent implements OnInit {
  @Input() solutions:any;
  constructor() { }

  ngOnInit() {
  }

}
