import { Component, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-modal',
  standalone: false,
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthModalComponent {
  @Input() display: boolean = false; // Controls modal visibility
  @Output() close = new EventEmitter<void>(); // Emits event to close modal

  isLoginMode: boolean = true; // Default mode is login
  loginForm: FormGroup;
  registerForm: FormGroup;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Login data:', this.loginForm.value);
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      console.log('Register data:', this.registerForm.value);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  closeModal() {
    this.close.emit();
  }
}
