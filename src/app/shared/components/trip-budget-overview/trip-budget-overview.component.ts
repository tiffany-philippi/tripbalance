import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TripsService } from 'src/app/core/services/trips';

@Component({
  selector: 'app-trip-budget-overview',
  templateUrl: './trip-budget-overview.component.html',
  styleUrls: ['./trip-budget-overview.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class TripBudgetOverviewComponent implements OnInit {
  @Input({ required: true }) tripId!: string | null;

  loading: boolean = true;
  hasError: boolean = false;
  trip: any = {};

  constructor(
    private tripsService: TripsService,
  ) { }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    const { data, error } = await this.tripsService.getTrip(this.tripId!);

    this.loading = false;
    this.trip = data;
    this.hasError = error !== null;
  }

  getSavingsClass(planned: number, spent: number): string {
    return this.tripsService.getSavingsClass(planned, spent);
  }

  isMoreThanZero(value: number): boolean {
    return this.tripsService.isMoreThanZero(value);
  }
}
