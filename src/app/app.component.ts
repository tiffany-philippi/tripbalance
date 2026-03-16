import { Component, inject } from '@angular/core';
import { HeaderService } from './core/services/header';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  headerService = inject(HeaderService);
  
  ionViewWillEnter() {
    this.headerService.setTitle('Minhas Viagens');
  }
  constructor() {}
}
