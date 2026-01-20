import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBarComponent {
  @Input() placeholder = 'Search...';
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();
} 
