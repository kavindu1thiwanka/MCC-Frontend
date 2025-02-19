import { Component, Input } from '@angular/core';
import { PaymentService } from '../../shared/services/payment.service';
import { UserService } from '../../shared/services/user.service';
import { AppConstant } from '../../shared/utils/app-constant';

@Component({
  selector: 'app-vehicle-details',
  standalone: false,

  templateUrl: './vehicle-details.component.html',
  styleUrl: './vehicle-details.component.scss'
})
export class VehicleDetailsComponent {

  @Input() visible: boolean = false;
  @Input() vehicle: any = { image: '', name: '', price: 0, duration: 0 };

  loginToProceed: boolean = false;
  addressIsMissing: boolean = false;
  incompleteAddress: boolean = false;
  showAddressModal: boolean = false;

  constructor(private paymentService: PaymentService, private userService: UserService) {}

  async checkout() {
    await this.validateUserDetails();

    if (this.loginToProceed) {
      // Handle login prompt
      return;
    }

    if (this.addressIsMissing || this.incompleteAddress) {
      this.showAddressModal = true;
      return;
    }

    // Proceed to payment if everything is valid
    this.paymentService.createCheckoutSession(1).subscribe(({ checkoutUrl }) => {
      window.location.href = checkoutUrl;
    });
  }

  async validateUserDetails() {
    const token = localStorage.getItem(AppConstant.TOKEN);
    if (!token) {
      this.loginToProceed = true;
      return;
    }

    try {
      const res: any = await this.userService.getUserAddress();
      if (res?.status === 200) {
        const { addressLine1, city, country } = res.body || {};

        if (!res.body || res.body === '') {
          this.addressIsMissing = true;
        } else if (!addressLine1 || !city || !country) {
          this.incompleteAddress = true;
        }
      }
    } catch (err) {
      console.error('Error fetching address:', err);
    }
  }

  handleAddressModalClose(updated: boolean) {
    this.showAddressModal = false;

    if (updated) {
      this.addressIsMissing = false;
      this.incompleteAddress = false;
    }
  }
}
