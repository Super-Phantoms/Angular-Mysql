import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamImageUploadComponent } from './team-image-upload.component';

describe('TeamImageUploadComponent', () => {
  let component: TeamImageUploadComponent;
  let fixture: ComponentFixture<TeamImageUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamImageUploadComponent]
    });
    fixture = TestBed.createComponent(TeamImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
