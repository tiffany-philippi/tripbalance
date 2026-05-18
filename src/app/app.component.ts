import { Component, inject } from '@angular/core';
import { HeaderService } from './core/services/header';
import { NavController } from '@ionic/angular';
import { AuthService } from './core/services/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  headerService = inject(HeaderService);
  authService = inject(AuthService);
  private navController = inject(NavController);

  constructor() {}

  goBack() {
    this.navController.back();
  }
}