import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDescriptionEditorComponent } from './single-description-editor.component';

describe('SingleDescriptionEditorComponent', () => {
  let component: SingleDescriptionEditorComponent;
  let fixture: ComponentFixture<SingleDescriptionEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleDescriptionEditorComponent]
    });
    fixture = TestBed.createComponent(SingleDescriptionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
