import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-promo-code-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promo-code-box.html',
})
export class PromoCodeBoxComponent {
  @Input() value = '';
  @Input() applied = false;

  @Output() valueChange = new EventEmitter<string>();
  @Output() apply = new EventEmitter<void>();

  onInput(v: string) {
    this.valueChange.emit(v);
  }

  onApply() {
    this.apply.emit();
  }
}
