import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ExpensesService } from 'src/app/core/services/expenses';
import { HeaderService } from 'src/app/core/services/header';
import { TripsService } from 'src/app/core/services/trips';
import { Expense } from 'src/app/models/expense';
import { TripSummary } from 'src/app/models/trip-summary.model';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.page.html',
  styleUrls: ['./trip-details.page.scss'],
  imports: [CommonModule, IonicModule],
})
export class TripDetailsPage  {
  headerService = inject(HeaderService);
  tripId: string | null = null;
  tripDetails: TripSummary = {
    id: '',
    name: '',
    budget: 0,
    total_expenses: 0,
    savings: 0
  }
  expenses: Expense[] = [];

  constructor(
    private route: ActivatedRoute,
    private tripsService: TripsService,
    private expensesService: ExpensesService,
  ) { }

  async ionViewWillEnter() {
    this.route.paramMap.subscribe(params => {
      this.tripId = params.get('id');
    });

    await this.loadTrip();
    await this.loadExpenses();
  }

  async loadTrip() {
    const { data, error } = await this.tripsService.getTrip(this.tripId!)
    if (data) {
      this.tripDetails = data
      this.headerService.setTitle(data.name);
      // @TODO find the right place for it: const color = CATEGORY_COLORS.find(c => c.name === data.color_key)
    }
  }

  async loadExpenses() {
    const { data, error } = await this.expensesService.getExpenses(this.tripId!)
    if (data) {
      this.expenses = data
    }
  }

}
