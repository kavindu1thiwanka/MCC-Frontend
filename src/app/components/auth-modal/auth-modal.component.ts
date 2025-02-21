import {Component, EventEmitter, Output, Input, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../shared/services/common.service';

@Component({
  selector: 'app-auth-modal',
  standalone: false,
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthModalComponent {
  @Input() display: boolean = false;
  @Output() close = new EventEmitter<void>();

  isLoginMode: boolean = true;
  loginForm: FormGroup;
  registerForm: FormGroup;
  showPassword: boolean = false;
  successfulRegistration: boolean = false;

  constructor(private fb: FormBuilder, private commonService: CommonService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {validators: this.passwordMatchValidator});
  }

  toggleMode() {
    this.loginForm.reset();
    this.registerForm.reset();
    this.isLoginMode = !this.isLoginMode;
  }

  async onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    await this.commonService.login(this.loginForm.value).then(res => {
      if (res && res.status === 200) {
        this.commonService.setUserDetails(res.body);
        this.closeModal();
      }
    }).catch(e => {

    });
  }

  async onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    await this.commonService.registerUser(this.registerForm.value).then((res: any) => {
      if (res.status === 201) {
        this.registerForm.reset();
        this.successfulRegistration = true;
      }
    }).catch((e) => {
      console.log('Error:', e);
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  closeModal() {
    this.loginForm.reset();
    this.registerForm.reset();
    this.isLoginMode = true;
    this.showPassword = false;
    this.close.emit();
  }

  // Custom validator to check password match
  private passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {mismatch: true};
  }

  hasError(controlName: string, error: string, form: FormGroup): boolean {
    const control = form.get(controlName);
    return !!control?.hasError(error) && (control.touched || control.dirty);
  }

}
