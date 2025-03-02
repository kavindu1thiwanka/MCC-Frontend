import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-status-indicator',
  standalone: false,

  templateUrl: './status-indicator.component.html',
  styleUrl: './status-indicator.component.scss'
})
export class StatusIndicatorComponent {
  @Input() status: 'A' | 'I' = 'I';
}
