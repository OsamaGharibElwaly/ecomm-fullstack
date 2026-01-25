import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PageTopbarComponent } from '../../shared/ui/page-topbar/page-topbar';
import { AccountFacade } from './account.facade';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [CommonModule, RouterModule, PageTopbarComponent],
  providers: [AccountFacade],
  templateUrl: './account.html',
  styleUrls: ['./account.css'],
})
export class AccountPage implements OnInit {
  readonly f = inject(AccountFacade);

  ngOnInit(): void {
    this.f.init();
  }
}
