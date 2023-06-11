import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtmngBriefSectionComponent } from './dtmng-brief-section.component';

describe('DtmngBriefSectionComponent', () => {
  let component: DtmngBriefSectionComponent;
  let fixture: ComponentFixture<DtmngBriefSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DtmngBriefSectionComponent]
    });
    fixture = TestBed.createComponent(DtmngBriefSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
