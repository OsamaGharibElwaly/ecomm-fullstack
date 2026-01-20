import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

type Category = {
  id: string;
  name: string;
  icon: 'grid' | 'monitor' | 'hanger' | 'sofa' | 'dumbbell';
};

@Component({
  selector: 'app-category-chips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-chips.html',
})
export class CategoryChipsComponent {
  @Input({ required: true }) items!: Category[];
  @Input({ required: true }) activeId!: string;
  @Output() activeIdChange = new EventEmitter<string>();

  setActive(id: string) {
    this.activeIdChange.emit(id);
  }
}
