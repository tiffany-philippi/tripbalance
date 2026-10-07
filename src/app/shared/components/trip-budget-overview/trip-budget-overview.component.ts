import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TripStateService } from 'src/app/core/services/trip-state';
import { TripsService } from 'src/app/core/services/trips';

@Component({
  selector: 'app-trip-budget-overview',
  templateUrl: './trip-budget-overview.component.html',
  styleUrls: ['./trip-budget-overview.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class TripBudgetOverviewComponent {
  private tripsService = inject(TripsService);
  private tripState = inject(TripStateService);

  trip = this.tripState.trip;

  getSavingsClass(planned: number, spent: number): string {
    return this.tripsService.getSavingsClass(planned, spent);
  }

  isMoreThanZero(value: number): boolean {
    return this.tripsService.isMoreThanZero(value);
  }
}
