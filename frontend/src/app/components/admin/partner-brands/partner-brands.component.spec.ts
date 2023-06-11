import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerBrandsComponent } from './partner-brands.component';

describe('PartnerBrandsComponent', () => {
  let component: PartnerBrandsComponent;
  let fixture: ComponentFixture<PartnerBrandsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerBrandsComponent]
    });
    fixture = TestBed.createComponent(PartnerBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
