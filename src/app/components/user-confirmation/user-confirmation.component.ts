import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../shared/services/common.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-confirmation',
  standalone: false,

  templateUrl: './user-confirmation.component.html',
  styleUrl: './user-confirmation.component.scss'
})
export class UserConfirmationComponent implements OnInit {

  loading: boolean = true;
  confirmed: boolean = false;
  uuid: string | null = '';

  constructor(private commonService: CommonService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.uuid = this.route.snapshot.queryParamMap.get('uuid');
    this.confirmUserEmail();
  }

  async confirmUserEmail() {
    await this.commonService.confirmUserEmail(this.uuid).then((res: any) => {
      if (res.status === 200) {
        this.loading = false;
        this.confirmed = true;
      } else {
        this.loading = false;
        this.confirmed = false;
      }
    }).catch((e) => {
      this.loading = false;
      this.confirmed = false;
    });
  }
}
