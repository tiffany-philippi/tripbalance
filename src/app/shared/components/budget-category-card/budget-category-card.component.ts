import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TripStateService } from 'src/app/core/services/trip-state';
import { TripsService } from 'src/app/core/services/trips';

@Component({
  selector: 'app-budget-category-card',
  templateUrl: './budget-category-card.component.html',
  styleUrls: ['./budget-category-card.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class BudgetCategoryCardComponent {
  private tripsService = inject(TripsService);
  private tripState = inject(TripStateService);

  loading = this.tripState.categoriesLoading;
  categories = this.tripState.categories;

  getSavingsClass(planned: number, spent: number): string {
    return this.tripsService.getSavingsClass(planned, spent);
  }

  isMoreThanZero(value: number): boolean {
    return this.tripsService.isMoreThanZero(value);
  }
}
