import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDescriptionEditorComponent } from './team-description-editor.component';

describe('SingleDescriptionEditorComponent', () => {
  let component: TeamDescriptionEditorComponent;
  let fixture: ComponentFixture<TeamDescriptionEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamDescriptionEditorComponent]
    });
    fixture = TestBed.createComponent(TeamDescriptionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
