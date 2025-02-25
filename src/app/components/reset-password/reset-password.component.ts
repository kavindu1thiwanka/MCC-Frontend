import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CommonService} from '../../shared/services/common.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: false,

  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  showPassword = false;
  isLoading = false;
  resetSuccess = false;
  token!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService
  ) {
    this.resetForm = this.fb.group({
      newPassword: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['tkn'];
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  get confirmPasswordError() {
    const control = this.resetForm.get('confirmPassword');
    return control?.touched && this.resetForm.get('newPassword')?.value !== control?.value
      ? 'Passwords do not match'
      : null;
  }

  isFieldInvalid(field: string) {
    const control = this.resetForm.get(field);
    return control?.invalid && control?.touched;
  }

  onSubmit() {
    this.resetForm.markAllAsTouched();
    if (this.resetForm.invalid || this.confirmPasswordError) return;

    this.isLoading = true;
    const payload = {
      token: this.token,
      newPassword: this.resetForm.value.newPassword
    };

    this.commonService.resetPassword(payload).then(res => {
      if (res && res.status !== 200) throw new Error('Failed to reset password. Please try again.');
      this.isLoading = false;
      this.resetSuccess = true;
      setTimeout(() => this.router.navigate(['/login']), 3000);
    }).catch(() => {
      this.isLoading = false;
      alert('Failed to reset password. Please try again.');
    });
  }
}
