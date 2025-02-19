import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-address-modal',
  standalone: false,

  templateUrl: './address-modal.component.html',
  styleUrl: './address-modal.component.scss'
})
export class AddressModalComponent implements OnInit {

  @Input() display: boolean = false;
  @Output() close = new EventEmitter<boolean>();

  addressForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      userId: [0],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: [''],
      country: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5,10}$')]]
    });

    this.loadUserAddress();
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
        if (res?.status === 200) {
          this.close.emit(true);
        }
      }).catch(() => {
        this.close.emit(false);
      });
    }
  }

  closeModal() {
    this.close.emit(false);
  }
}
