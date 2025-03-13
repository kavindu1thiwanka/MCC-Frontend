import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../shared/services/common.service';
import {AppConstant} from '../../shared/utils/app-constant';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;
  forgotPasswordForm: FormGroup;
  isRegistering = false;
  isForgotPassword = false;
  showPassword = false;
  isLoading = false;
  successfulRegistration = false;
  identifier: string | null = AppConstant.IDENTIFIER_ROLE_CUSTOMER;

  constructor(private fb: FormBuilder, private commonService: CommonService, private router: Router, private activeRouter: ActivatedRoute) {
    this.authForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      contactNumber: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required]],
      identifier: [null]
    });

    this.forgotPasswordForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.identifier = this.activeRouter.snapshot.queryParamMap.get('identifier') ? this.activeRouter.snapshot.queryParamMap.get('identifier') : null;
  }

  toggleForm(event: Event) {
    event.preventDefault();
    this.isRegistering = !this.isRegistering;
    this.authForm.reset();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {
    this.authForm.markAllAsTouched();

    if (this.isRegistering) {
      if (this.authForm.invalid) {
        return;
      }

      if (this.authForm.value.password !== this.authForm.value.confirmPassword) {
        return;
      }
    } else {
      if (this.authForm.get('email')?.invalid || this.authForm.get('password')?.invalid) {
        return;
      }
    }

    this.isLoading = true;
    this.authForm.value.identifier = this.identifier && this.identifier !== '' ? this.identifier : AppConstant.IDENTIFIER_ROLE_CUSTOMER;

    if (this.isRegistering) {
      await this.commonService.registerUser(this.authForm.value).then((res: any) => {
        if (res.status === 201) {
          this.authForm.reset();
          this.isLoading = false;
          this.successfulRegistration = true;
        }
      }).catch((e) => {
        this.isLoading = false;
        console.log('Error:', e);
      });
    } else {
      await this.commonService.login(this.authForm.value).then((res: any) => {
        if (res.status === 200) {
          this.commonService.setUserDetails(res.body);
          this.router.navigate(['/#']);
        }
        this.isLoading = false;
      }).catch((e) => {
        this.isLoading = false;
      });
    }
  }

  async onForgotPasswordSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.isLoading = true;

    await this.commonService.sendPasswordResetEmail(this.forgotPasswordForm.value.email).then((res: any) => {
      this.isLoading = false;
      if (res.status === 200) {
        // Show message that the reset email was sent
      }
    }).catch((e) => {
      this.isLoading = false;
      console.log('Error:', e);
    });
  }

  toggleForgotPassword(event: Event) {
    event.preventDefault();
    this.isForgotPassword = !this.isForgotPassword;
  }

  // Custom getter for password confirmation error
  get confirmPasswordError() {
    const control = this.authForm.get('confirmPassword');
    if (control?.touched && control?.hasError('required')) {
      return 'Confirm Password is required';
    } else if (this.isRegistering && this.authForm.get('password')?.value !== control?.value) {
      return 'Passwords do not match';
    }
    return null;
  }

  // Helper to check if the field is invalid and has been touched
  isFieldInvalid(field: string) {
    const control = this.authForm.get(field);
    return control?.invalid && control?.touched;
  }
}
