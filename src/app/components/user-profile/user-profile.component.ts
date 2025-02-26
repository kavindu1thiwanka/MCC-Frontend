import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: false,

  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnChanges {
  @Input() display: boolean = false;
  @Output() close = new EventEmitter<void>();

  user = {
    id: 0,
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    password: ''
  };

  constructor(private userService: UserService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['display'] && this.display) {
      this.getLoggedInUserDetails();
    }
  }

  closeModal() {
    this.close.emit();
  }

  saveChanges() {
    console.log('User profile updated:', this.user);
    this.closeModal();
  }

  async getLoggedInUserDetails() {
    await this.userService.getLoggedInUserDetails().then(res => {
      if (res?.status === 200 && res.body) {
        this.user = res.body as any;
      }
    }).catch(e => {

    });
  }
}
