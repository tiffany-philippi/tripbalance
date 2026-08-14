import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { IONIC_IMPORTS } from '../../ionic-imports';

@Component({
  selector: 'app-tb-button',
  templateUrl: './tb-button.component.html',
  styleUrls: ['./tb-button.component.scss'],
  imports: [
    ...IONIC_IMPORTS,
    CommonModule,
  ],
})
export class TbButtonComponent implements OnInit {
  @Input() type: string = 'primary';
  @Input() label!: string;
  // @TODO: Import icon options and create enum for those
  @Input() icon: string = 'add-outline';
  @Input() hasIcon: boolean = false;
  @Input() fill: string = 'default';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;

  @Output() onClick = new EventEmitter();

  constructor() {
    addIcons({ addOutline });
  }

  ngOnInit() { }

  clicked() {
    this.onClick.emit();
  }

}
