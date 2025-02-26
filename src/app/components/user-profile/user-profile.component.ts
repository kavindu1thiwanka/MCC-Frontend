import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: false,

  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  @Input() display: boolean = false;
  @Output() close = new EventEmitter<void>();

  user = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  };

  closeModal() {
    this.close.emit();
  }

  saveChanges() {
    console.log('User profile updated:', this.user);
    this.closeModal();
  }

  changeProfilePicture() {
    console.log('Change profile picture clicked');
  }
}
