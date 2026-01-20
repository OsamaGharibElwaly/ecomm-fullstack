import { Component, EventEmitter, Input, Output } from '@angular/core';

export type TabKey = 'description' | 'specs' | 'reviews';
export type TabItem = { key: TabKey; label: string };

@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: './tabs.html',
})
export class TabsComponent {
  @Input({ required: true }) tabs!: TabItem[];
  @Input({ required: true }) active!: TabKey;
  @Output() activeChange = new EventEmitter<TabKey>();

  setActive(k: TabKey) {
    this.activeChange.emit(k);
  }
}
