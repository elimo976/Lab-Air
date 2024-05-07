import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-color-label',
  templateUrl: './color-label.component.html',
  styleUrls: ['./color-label.component.css']
})
export class ColorLabelComponent {
  @Input() color: { name: string, code: string } = { name: '', code: '' };

  @Output() colorSelected = new EventEmitter<string>();

  selectColor(colorName: string) {
    this.colorSelected.emit(colorName);
  }
}
