import {Component, Input} from '@angular/core';
import {PaymentService} from '../../shared/services/payment.service';
import {AppConstant} from '../../shared/utils/app-constant';
import {CommonService} from '../../shared/services/common.service';

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

  constructor(private paymentService: PaymentService, private commonService: CommonService) {
  }

  async checkout() {

    await this.validateUserDetails();

    if (!this.loginToProceed && !this.addressIsMissing && !this.incompleteAddress) {
      this.paymentService.createCheckoutSession(1).subscribe(({ checkoutUrl }) => {
        window.location.href = checkoutUrl;
      });
    }
  }

   async validateUserDetails() {
    if (!localStorage.getItem(AppConstant.TOKEN) || localStorage.getItem(AppConstant.TOKEN) == null || localStorage.getItem(AppConstant.TOKEN) == '') {
      this.loginToProceed = true;
      return;
    }

    await this.commonService.isAddressAvailable().then((res: any) => {
      if (res?.status === 200) {
        if (!res.body || res.body == '') {
          this.addressIsMissing = true;
          return;
        } else {
          if (res.body.addressLine1 || res.body.city || res.body.country) {
            this.incompleteAddress = true;
            return;
          }
        }
      }
    }).catch(e => {

    })
  }
}
