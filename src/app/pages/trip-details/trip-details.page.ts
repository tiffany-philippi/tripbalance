import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ExpensesService } from 'src/app/core/services/expenses';
import { HeaderService } from 'src/app/core/services/header';
import { TripsService } from 'src/app/core/services/trips';
import { Expense } from 'src/app/models/expense';

@Component({
	selector: 'app-trip-details',
	templateUrl: './trip-details.page.html',
	styleUrls: ['./trip-details.page.scss'],
	imports: [CommonModule, IonicModule],
})
export class TripDetailsPage  {
	headerService = inject(HeaderService);
	tripId: string | null = null;
	trip: any = {};
	// @TODO: Remove any
	categories: any[] = [];
	expenses: any[] = [];
	loading = true;
	overviewTitles = ['Planned', 'Spent', 'Budget'];

	constructor(
		private route: ActivatedRoute,
		private tripsService: TripsService,
		private expensesService: ExpensesService,
		private router: Router,
	) { }

	async ionViewWillEnter() {
		this.route.paramMap.subscribe(params => {
			this.tripId = params.get('id');
		});

		await this.loadData(this.tripId!);
	}

	async loadData(tripId: string) {
		// @TODO: Load data separately
		try {
			this.loading = true;

			const data = await this.tripsService.getTripDetails(tripId);
			console.log(data);

			this.trip = data.trip;
			this.categories = data.categories;
			this.expenses = data.expenses;

		} catch (error) {
			console.error('Erro ao carregar viagem', error);
		} finally {
			this.loading = false;
		}
	}

	getSavingsClass(planned: number, spent: number) {
		if (this.isMoreThanZero(planned - spent)) {
			return 'trip-savings';
		} else return 'trip-overbudget';
	}

	isMoreThanZero(value: number) {
		return value >= 0;
	}

	addExpense() {
		this.router.navigate([`trip-details/${this.tripId}/create-expense`])
	}

	addBudget() {
		//this.router.navigate([`trip-details/${this.tripId}/create-budget`])
	}

	openCategory(category: any) {
		console.log('entrou')
	 // this.router.navigate([`trip-details/${this.tripId}/category/${category.id}`])
	 console.log(category)
	}

	splitAmount(amount: number, split: number) {
		return (amount / split).toFixed(2);
	}

}
