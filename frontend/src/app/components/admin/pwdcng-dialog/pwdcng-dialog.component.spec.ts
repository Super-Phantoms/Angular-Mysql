import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwdcngDialogComponent } from './pwdcng-dialog.component';

describe('PwdcngDialogComponent', () => {
  let component: PwdcngDialogComponent;
  let fixture: ComponentFixture<PwdcngDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PwdcngDialogComponent]
    });
    fixture = TestBed.createComponent(PwdcngDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
