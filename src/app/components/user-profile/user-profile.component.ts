import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppConstant} from '../../shared/utils/app-constant';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnChanges {
  @Input() display: boolean = false;
  @Input() user: any = {};
  @Output() close = new EventEmitter<void>();

  confirmPasswordMismatch: boolean = false;
  isChangePasswordVisible: boolean = false;
  profileForm: FormGroup;
  disablePasswordChange: boolean = false;
  showPassword: boolean = false;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      id: [null],
      username: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required, Validators.pattern('^\\d{10}$')]], // 10-digit validation
      password: [''],
      confirmPassword: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['display'] && this.display) {
      console.log(this.user);
      if (!this.user) {
        this.getLoggedInUserDetails();
      } else {
        this.profileForm.patchValue(this.user);
        this.disablePasswordChange = true;
      }
      this.profileForm.get('password')?.setValue('');
    }
  }

  updatePasswordValidators() {
    const passwordControl = this.profileForm.get('password');
    const confirmPasswordControl = this.profileForm.get('confirmPassword');

    if (this.isChangePasswordVisible) {
      passwordControl?.setValidators([Validators.required, Validators.minLength(6)]);
      confirmPasswordControl?.setValidators([Validators.required, Validators.minLength(6)]);
    } else {
      passwordControl?.clearValidators();
      confirmPasswordControl?.clearValidators();
    }

    passwordControl?.updateValueAndValidity();
    confirmPasswordControl?.updateValueAndValidity();
  }

  closeModal() {
    this.profileForm.reset();
    this.confirmPasswordMismatch = false;
    this.isChangePasswordVisible = false;
    this.disablePasswordChange = false;
    this.close.emit();
  }

  updateUserDetails() {
    this.profileForm.markAllAsTouched();
    if (this.profileForm.valid && !this.confirmPasswordMismatch) {
      this.userService.updateUserProfile(this.profileForm.value).then(res => {
        if (res?.status === 200 && res.body) {
          localStorage.setItem(AppConstant.NAME, (res.body as any).firstName + ' ' + (res.body as any).lastName);
          this.closeModal();
          this.profileForm.reset();
          window.location.reload();
        }
      })
    }
  }

  toggleChangePassword() {
    this.isChangePasswordVisible = !this.isChangePasswordVisible;
    this.updatePasswordValidators();
  }

  validateConfirmPassword() {
    if (!this.isChangePasswordVisible) return;

    const password = this.profileForm.get('password')?.value;
    const confirmPassword = this.profileForm.get('confirmPassword')?.value;

    this.confirmPasswordMismatch = confirmPassword !== password;

    const confirmPasswordControl = this.profileForm.get('confirmPassword');
    if (this.confirmPasswordMismatch) {
      confirmPasswordControl?.setErrors({mismatch: true});
    } else {
      confirmPasswordControl?.setErrors(null);
    }

    confirmPasswordControl?.updateValueAndValidity();
  }

  async getLoggedInUserDetails() {
    await this.userService.getLoggedInUserDetails().then(res => {
      if (res?.status === 200 && res.body) {
        this.profileForm.patchValue(res.body);
      }
    }).catch(e => {
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
