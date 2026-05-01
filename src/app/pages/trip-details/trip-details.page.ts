import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ExpensesService } from 'src/app/core/services/expenses';
import { HeaderService } from 'src/app/core/services/header';
import { TripsService } from 'src/app/core/services/trips';
import { TripBudgetOverviewComponent } from 'src/app/shared/components/trip-budget-overview/trip-budget-overview.component';
import { BudgetCategoryCardComponent } from "src/app/shared/components/budget-category-card/budget-category-card.component";
import { ExpensesListComponent } from 'src/app/shared/components/expenses-list/expenses-list.component';

@Component({
	selector: 'app-trip-details',
	templateUrl: './trip-details.page.html',
	styleUrls: ['./trip-details.page.scss'],
	imports: [
		CommonModule, 
		IonicModule, 
		TripBudgetOverviewComponent, 
		BudgetCategoryCardComponent, 
		ExpensesListComponent,
	],
})
export class TripDetailsPage  {
	headerService = inject(HeaderService);
	tripId: string | null = null;
	trip: any = {};
	// @TODO: Remove any
	categories: any[] = [];
	expenses: any[] = [];
	loadingID = true;

	constructor(
		private route: ActivatedRoute,
		private tripsService: TripsService,
		private router: Router,
	) { }

	ionViewWillEnter() {
		this.route.paramMap.subscribe(params => {
			this.tripId = params.get('id');
			this.loadingID = false;
		});
	}

	getSavingsClass(planned: number, spent: number): string {
		return this.tripsService.getSavingsClass(planned, spent);
	}

	isMoreThanZero(value: number): boolean {
		return this.tripsService.isMoreThanZero(value);
	}

	addExpense() {
		this.router.navigate([`trip-details/${this.tripId}/create-expense`])
	}

	addBudget() {
		//this.router.navigate([`trip-details/${this.tripId}/create-budget`])
	}



}
