import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnChanges {
  @Input() display: boolean = false;
  @Output() close = new EventEmitter<void>();

  confirmPasswordMismatch: boolean = false;
  isChangePasswordVisible: boolean = false;
  profileForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      id: [null],
      username: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required, Validators.pattern('^\d{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['display'] && this.display) {
      this.getLoggedInUserDetails();
    }
  }

  closeModal() {
    this.close.emit();
  }

  updateUserDetails() {
    console.log(this.profileForm.value);
    this.closeModal();
  }

  toggleChangePassword() {
    this.isChangePasswordVisible = !this.isChangePasswordVisible;
  }

  validateConfirmPassword() {
    if (!this.isChangePasswordVisible) return;
    const password = this.profileForm.get('password')?.value;
    const confirmPassword = this.profileForm.get('confirmPassword')?.value;
    this.confirmPasswordMismatch = confirmPassword !== password;
    if (this.confirmPasswordMismatch) {
      this.profileForm.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      this.profileForm.get('confirmPassword')?.setErrors(null);
    }
  }

  async getLoggedInUserDetails() {
    await this.userService.getLoggedInUserDetails().then(res => {
      if (res?.status === 200 && res.body) {
        this.profileForm.patchValue(res.body);
      }
    }).catch(e => {});
  }
}
