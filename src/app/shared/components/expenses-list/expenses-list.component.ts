import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TripStateService } from 'src/app/core/services/trip-state';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class ExpensesListComponent {
  private tripState = inject(TripStateService);

  expenses = this.tripState.expenses;
  hasError = this.tripState.expensesError;

  splitAmount(amount: number, split: number) {
    return (amount / split).toFixed(2);
  }
}
