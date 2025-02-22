import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { PaymentService } from '../../shared/services/payment.service';
import { UserService } from '../../shared/services/user.service';
import { AppConstant } from '../../shared/utils/app-constant';
import {VehicleService} from '../../shared/services/vehicle.service';

@Component({
  selector: 'app-vehicle-details',
  standalone: false,

  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss'],
})
export class VehicleDetailsComponent implements OnChanges{

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
  reservationDetails: any = {};

  constructor(private paymentService: PaymentService, private userService: UserService, private vehicleService: VehicleService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      this.setReservationDetails();
      this.getTotalAmount();
    }
  }

  async checkout() {
    await this.validateUserDetails();

    if (this.loginToProceed) return;
    if (this.addressIsMissing || this.incompleteAddress) {
      this.showAddressModal = true;
      return;
    }

    this.setReservationDetails();

    this.paymentService.createCheckoutSessionAndMakeReservation(this.reservationDetails).subscribe(({ checkoutUrl }) => {
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

  getTotalAmount() {
    this.vehicleService.getVehicleTotalCost(this.reservationDetails).then(res => {
      if (res?.status === 200 && res.body) {
        this.totalAmount = (res?.body as any)?.totalCost;
      }
    }).catch(e => {

    });
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

  setReservationDetails() {
    this.reservationDetails = {
      vehicleNo: this.vehicle.vehicleNo,
      pickUpDate: this.bookingDetails.pickupDate,
      returnDate: this.bookingDetails.returnDate,
      pickUpLocation: this.bookingDetails.pickup,
      returnLocation: this.bookingDetails.return,
      needDriver: this.needDriver,
      pricePerDay: this.vehicle.pricePerDay,
      totalCost: this.totalAmount
    };
  }
}
