import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-address-modal',
  standalone: false,

  templateUrl: './address-modal.component.html',
  styleUrls: ['./address-modal.component.scss'],
})
export class AddressModalComponent implements OnInit {

  @Input() display: boolean = false;
  @Output() close = new EventEmitter<boolean>();

  addressForm!: FormGroup;

  fields = [
    { id: 'addressLine1', label: 'Address Line 1', controlName: 'addressLine1', required: true, placeholder: 'Enter primary address' },
    { id: 'addressLine2', label: 'Address Line 2', controlName: 'addressLine2', required: false, placeholder: 'Enter secondary address (optional)' },
    { id: 'city', label: 'City', controlName: 'city', required: true, placeholder: 'Enter city' },
    { id: 'state', label: 'State', controlName: 'state', required: false, placeholder: 'Enter state' },
    { id: 'country', label: 'Country', controlName: 'country', required: true, placeholder: 'Enter country' },
    { id: 'postalCode', label: 'Postal Code', controlName: 'postalCode', required: true, placeholder: 'Enter postal code' }
  ];

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      userId: [0],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: [''],
      country: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5,10}$')]],
    });
  }

  loadUserAddress() {
    this.userService.getUserAddress().then(res => {
      if (res?.status === 200 && res.body) {
        this.addressForm.patchValue(res.body);
      }
    });
  }

  onSubmit() {
    if (this.addressForm.valid) {
      this.userService.updateUserAddress(this.addressForm.value).then(res => {
        if (res?.status === 200) this.close.emit(true);
      }).catch(() => this.close.emit(false));
    }
  }

  closeModal() {
    this.close.emit(false);
  }
}
