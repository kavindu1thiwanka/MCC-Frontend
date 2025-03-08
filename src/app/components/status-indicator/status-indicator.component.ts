import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-status-indicator',
  standalone: false,

  templateUrl: './status-indicator.component.html',
  styleUrl: './status-indicator.component.scss'
})
export class StatusIndicatorComponent implements OnChanges {
  @Input() status: 'A' | 'I' | 'Y' | 'N' | 'D' | 'C' = 'I';

  label = 'Inactive';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['status'] && this.status) {
      switch (this.status) {
        case 'A':
          this.label = 'Active';
          break;
        case 'I':
          this.label = 'Inactive';
          break;
        case 'Y':
          this.label = 'Yes';
          break;
        case 'N':
          this.label = 'No';
          break;
        case 'D':
          this.label = 'Canceled';
          break;
        case 'C':
          this.label = 'Completed';
          break;
      }
    }
  }
}
