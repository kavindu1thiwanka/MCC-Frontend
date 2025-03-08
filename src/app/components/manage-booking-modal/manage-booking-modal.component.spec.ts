import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBookingModalComponent } from './manage-booking-modal.component';

describe('ManageBookingModalComponent', () => {
  let component: ManageBookingModalComponent;
  let fixture: ComponentFixture<ManageBookingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageBookingModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBookingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
