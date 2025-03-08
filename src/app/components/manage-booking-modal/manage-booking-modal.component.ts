import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ReservationService} from '../../shared/services/reservation.service';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-manage-booking-modal',
  standalone: false,
  templateUrl: './manage-booking-modal.component.html',
  styleUrls: ['./manage-booking-modal.component.scss']
})
export class ManageBookingModalComponent implements OnChanges {
  @Input() display = false;
  @Output() close = new EventEmitter<void>();

  isEditable = false;
  showDriverDetails = false;
  showCustomerDetails = false;
  reservationId: any = '';
  bookingForm: FormGroup;
  customerDetails: any = {};
  driverDetails: any = {};

  constructor(private fb: FormBuilder, private reservationService: ReservationService, private eRef: ElementRef) {
    this.bookingForm = this.fb.group({
      id: [''],
      vehicleNo: [''],
      pickUpLocation: [''],
      returnLocation: [''],
      pickUpDate: [''],
      returnDate: [''],
      userId: [0],
      driverId: [0]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['display'] && this.display) {
      this.bookingForm.get('vehicleNo')?.disable();
      this.isEditable = false;
      this.enableDisableFields();
    }
  }

  toggleDriverDetails() {
    this.showDriverDetails = !this.showDriverDetails;
    this.showCustomerDetails = false;
  }

  toggleCustomerDetails() {
    this.showCustomerDetails = !this.showCustomerDetails;
    this.showDriverDetails = false;
  }


  // Close Modal
  closeModal() {
    this.display = false;
    this.isEditable = false;
    this.reservationId = '';
    this.driverDetails = {};
    this.customerDetails = {};
    this.bookingForm.reset();
    this.bookingForm.get('id')?.setValue('');
    this.close.emit();
  }

  // Search Reservation by ID
  async searchReservation() {
    if (!this.reservationId || this.reservationId === 0) alert('Please enter a valid reservation ID.');
    await this.reservationService.getReservationById(this.reservationId).then((res: any) => {

      const formatDateTime = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        return localDate.toISOString().slice(0, 16); // Extract "YYYY-MM-DDTHH:MM"
      };

      if (res?.status === 200 && res.body) {
        this.bookingForm.patchValue({
          id: res.body.id || '',
          vehicleNo: res.body.vehicleNo || '',
          pickUpLocation: res.body.pickUpLocation || '',
          returnLocation: res.body.returnLocation || '',
          pickUpDate: formatDateTime(res.body.pickUpDate),
          returnDate: formatDateTime(res.body.returnDate),
          userId: res.body.userId || 0,
          driverId: res.body.driverId || 0
        });

        this.customerDetails = res.body.customerDetails || {};
        this.driverDetails = res.body.driverDetails || {};
        this.driverDetails.needDriver = res.body.needDriver || false;
      }
    }).catch(e => {

    });
  }

  // Toggle Edit Mode
  toggleEditMode() {
    this.isEditable = !this.isEditable;
    this.enableDisableFields();
  }

  enableDisableFields() {
    if (this.isEditable) {
      this.bookingForm.get('pickUpLocation')?.enable();
      this.bookingForm.get('returnLocation')?.enable();
      this.bookingForm.get('pickUpDate')?.enable();
      this.bookingForm.get('returnDate')?.enable();
    } else {
      this.bookingForm.get('pickUpLocation')?.disable();
      this.bookingForm.get('returnLocation')?.disable();
      this.bookingForm.get('pickUpDate')?.disable();
      this.bookingForm.get('returnDate')?.disable();
    }
  }

  closeTooltips() {
    this.showDriverDetails = false;
    this.showCustomerDetails = false;
  }
}
