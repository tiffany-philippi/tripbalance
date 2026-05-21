import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  imports: [CommonModule, IonicModule,],
})
export class EmptyStateComponent {
  @Input() icon: string = 'alert-circle-outline';
  @Input() title: string = 'No data found';
  @Input() message: string = 'No data found';
  @Input() buttonLabel?: string = 'No data found';
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();
}
