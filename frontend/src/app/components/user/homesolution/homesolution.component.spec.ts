import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSolutionComponent } from './homesolution.component';

describe('HomeSolutionComponent', () => {
  let component: HomeSolutionComponent;
  let fixture: ComponentFixture<HomeSolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
