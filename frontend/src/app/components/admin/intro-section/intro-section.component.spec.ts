import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtmngSectionComponent } from './dtmng-section.component';

describe('DtmngSectionComponent', () => {
  let component: DtmngSectionComponent;
  let fixture: ComponentFixture<DtmngSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DtmngSectionComponent]
    });
    fixture = TestBed.createComponent(DtmngSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
