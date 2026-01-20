import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './page-topbar.html',
})
export class PageTopbarComponent {
  @Input() title = '';
  @Input() cartCount = 0;
  @Input() backLink = '/';
}
