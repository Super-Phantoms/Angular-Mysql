import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmDialogComponent } from './alarm-dialog.component';

describe('AlarmDialogComponent', () => {
  let component: AlarmDialogComponent;
  let fixture: ComponentFixture<AlarmDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlarmDialogComponent]
    });
    fixture = TestBed.createComponent(AlarmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
