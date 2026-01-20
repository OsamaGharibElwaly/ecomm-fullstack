import { Component, EventEmitter, Input, Output } from '@angular/core';

export type VariantColor = { id: string; name: string; hex: string };

@Component({
  selector: 'app-color-variants',
  standalone: true,
  templateUrl: './color-variants.html',
})
export class ColorVariantsComponent {
  @Input() title = 'COLOR VARIANT';
  @Input({ required: true }) items!: VariantColor[];
  @Input({ required: true }) activeId!: string;
  @Output() activeIdChange = new EventEmitter<string>();

  setActive(id: string) {
    this.activeIdChange.emit(id);
  }
}
