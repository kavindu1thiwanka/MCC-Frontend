import {Component, Input} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input() public isLandingPage = true;

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
