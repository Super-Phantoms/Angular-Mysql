import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgAxiosComponent } from './ng-axios.component';

describe('NgAxiosComponent', () => {
  let component: NgAxiosComponent;
  let fixture: ComponentFixture<NgAxiosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgAxiosComponent]
    });
    fixture = TestBed.createComponent(NgAxiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
