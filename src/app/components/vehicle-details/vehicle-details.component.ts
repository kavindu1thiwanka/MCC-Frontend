import {Component, EventEmitter, Input, Output} from '@angular/core';
import { PaymentService } from '../../shared/services/payment.service';
import { UserService } from '../../shared/services/user.service';
import { AppConstant } from '../../shared/utils/app-constant';

@Component({
  selector: 'app-vehicle-details',
  standalone: false,

  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss'],
})
export class VehicleDetailsComponent {

  @Input() visible: boolean = false;
  @Input() vehicle: any = {};
  @Input() bookingDetails: any = {};
  @Output() close = new EventEmitter<void>();

  loginToProceed: boolean = false;
  addressIsMissing: boolean = false;
  incompleteAddress: boolean = false;
  showAddressModal: boolean = false;
  needDriver: boolean = false;
  totalAmount: number = 0;

  constructor(private paymentService: PaymentService, private userService: UserService) {}

  async checkout() {
    await this.validateUserDetails();

    if (this.loginToProceed) return;
    if (this.addressIsMissing || this.incompleteAddress) {
      this.showAddressModal = true;
      return;
    }

    const reservationDetails = {
      vehicleNo: this.vehicle.vehicleNo,
      pickUpDate: this.bookingDetails.pickupDate,
      returnDate: this.bookingDetails.returnDate,
      pickUpLocation: this.bookingDetails.pickup,
      returnLocation: this.bookingDetails.return,
      needDriver: this.needDriver,
      amount: this.totalAmount
    };

    this.paymentService.createCheckoutSessionAndMakeReservation(reservationDetails).subscribe(({ checkoutUrl }) => {
      window.location.href = checkoutUrl;
    });
  }

  async validateUserDetails() {
    if (!localStorage.getItem(AppConstant.REFRESH_TOKEN) || !localStorage.getItem(AppConstant.ACCESS_TOKEN)) {
      this.loginToProceed = true;
      return;
    }

    try {
      const res: any = await this.userService.getUserAddress();
      const { addressLine1, city, country } = res?.body || {};

      if (!res.body) this.addressIsMissing = true;
      else if (!addressLine1 || !city || !country) this.incompleteAddress = true;
    } catch (err) {
      console.error('Error fetching address:', err);
    }
  }

  handleClose() {
    this.visible = false;
    this.close.emit();
  }

  handleAddressModalClose(updated: boolean) {
    this.showAddressModal = false;

    if (updated) {
      this.addressIsMissing = false;
      this.incompleteAddress = false;
    }
  }

  handleLoginModalClose($event: any) {
    this.loginToProceed = false;
  }
}
