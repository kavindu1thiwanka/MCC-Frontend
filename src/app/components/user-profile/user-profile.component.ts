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
  @Input() isDriver: boolean = false;
  @Input() createNewUser: boolean = false;
  @Input() identifier: string = '';
  @Input() user: any = undefined;
  @Output() close = new EventEmitter<void>();

  confirmPasswordMismatch: boolean = false;
  isChangePasswordVisible: boolean = false;
  profileForm: FormGroup;
  disablePasswordChange: boolean = false;
  showPassword: boolean = false;

  licensePreview: any = null;
  drivingLicenseName: string = '';

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      id: [null],
      username: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      password: [''],
      confirmPassword: [''],
      drivingLicense: [null],
      driverLicenseNo: [''],
      identifier: [null]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['display'] && this.display) {

      if (this.createNewUser) {
        return;
      }

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
    this.user = undefined;
    this.display = false;
    this.close.emit();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.profileForm.patchValue({
        drivingLicense: file,
      });
    }
  }

  updateUserDetails() {
    this.profileForm.markAllAsTouched();
    if (this.profileForm.valid && !this.confirmPasswordMismatch) {
      this.userService.updateUserProfile(this.getProfileFormDataAsFormData()).then((res) => {
        if (res?.status === 200 && res.body) {
          this.closeModal();
          this.profileForm.reset();
          if ((res.body as any).isLoggedInProfileUpdated) {
            localStorage.setItem(AppConstant.NAME, (res.body as any).firstName + ' ' + (res.body as any).lastName);
            window.location.reload();
          }
        }
      });
    }
  }

  private getProfileFormDataAsFormData() {
    const formData = new FormData();
    Object.keys(this.profileForm.value).forEach((key) => {
      const value = this.profileForm.get(key)?.value;
      if (key === 'drivingLicense' && !value) {
        return;
      }
      if (this.createNewUser && (key === 'username' || key === 'id')) {
        return;
      }
      formData.append(key, value);
    });
    return formData;
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

  createUser() {
    this.profileForm.markAllAsTouched();
    if (this.profileForm.valid && !this.confirmPasswordMismatch) {
      this.profileForm.get('identifier')?.setValue(this.identifier && this.identifier !== '' ? this.identifier : null);
      this.userService.createUser(this.getProfileFormDataAsFormData()).then((res) => {
        if (res?.status === 201) {
          this.closeModal();
          this.profileForm.reset();
        }
      });
    }
  }
}
