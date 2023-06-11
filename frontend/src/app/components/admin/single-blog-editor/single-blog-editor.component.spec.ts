import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBlogEditorComponent } from './single-blog-editor.component';

describe('SingleBlogEditorComponent', () => {
  let component: SingleBlogEditorComponent;
  let fixture: ComponentFixture<SingleBlogEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleBlogEditorComponent]
    });
    fixture = TestBed.createComponent(SingleBlogEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
