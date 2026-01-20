import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-qty-stepper',
  standalone: true,
  templateUrl: './qty-stepper.html',
})
export class QtyStepperComponent {
  @Input() title = 'QUANTITY';
  @Input() value = 1;
  @Output() valueChange = new EventEmitter<number>();

  dec() {
    this.valueChange.emit(Math.max(1, this.value - 1));
  }
  inc() {
    this.valueChange.emit(this.value + 1);
  }
}
