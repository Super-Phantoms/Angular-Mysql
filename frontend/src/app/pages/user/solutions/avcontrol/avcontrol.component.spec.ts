import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AVControlComponent } from './avcontrol.component';

describe('AVControlComponent', () => {
  let component: AVControlComponent;
  let fixture: ComponentFixture<AVControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AVControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AVControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
