import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderService } from 'src/app/core/services/header';
import { TripsService } from 'src/app/core/services/trips';
import { TripBudgetOverviewComponent } from 'src/app/shared/components/trip-budget-overview/trip-budget-overview.component';
import { BudgetCategoryCardComponent } from "src/app/shared/components/budget-category-card/budget-category-card.component";
import { ExpensesListComponent } from 'src/app/shared/components/expenses-list/expenses-list.component';
import { CategorySummaryView, ExpenseItem, TripView } from 'src/app/models/trip.model';
import { ToastService } from 'src/app/core/services/toast';
import { ViewChild } from '@angular/core';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';


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
		EmptyStateComponent,
	],
})
export class TripDetailsPage {
	@ViewChild(ExpensesListComponent) expensesList!: ExpensesListComponent;
	@ViewChild(BudgetCategoryCardComponent) categoryCard!: BudgetCategoryCardComponent;
	@ViewChild(TripBudgetOverviewComponent) budgetOverview!: TripBudgetOverviewComponent;

	headerService = inject(HeaderService);
	tripId!: string;
	trip!: TripView;
	categories: CategorySummaryView[] = [];
	expenses: ExpenseItem[] = [];

	loading: boolean = true;

	public alertButtons = [
		{
			text: 'Cancel',
			role: 'cancel',
		},
		{
			text: 'Delete',
			role: 'confirm',
			handler: () => {
				this.deleteTrip(this.tripId);
			},
		},
	];

	constructor(
		private route: ActivatedRoute,
		private tripsService: TripsService,
		private router: Router,
		private toastService: ToastService
	) { }

	ionViewWillEnter() {
		this.route.paramMap.subscribe(async params => {
			this.tripId = params.get('id') as string;
			await this.loadTrip();
			this.headerService.setHeader(this.trip?.name ?? 'Details', true);
			this.loading = false;
		});
	}

	/* It watches for changes in the expensesList, categoryCard, and budgetOverview and updates previously loaded data */
	ionViewDidEnter() {
		this.expensesList?.loadExpenses();
		this.categoryCard?.loadCategories();
		this.budgetOverview?.loadData();
	}

	async loadTrip() {
		const { data, error } = await this.tripsService.getTrip(this.tripId);

		if (data) this.trip = data as TripView;
		if (error) {
			await this.toastService.error('There was an error loading trip');
			console.error('Error loading trip', error);
		}
	}

	addExpense() {
		this.router.navigate([`trip-details/${this.tripId}/expense`])
	}

	setupBudget(tripId: string) {
		this.router.navigate([`trip-setup/${tripId}/categories`])
	}

	async deleteTrip(id: string) {
		const { error } = await this.tripsService.deleteTrip(id);

		if (error) {
			await this.toastService.error('Error deleting trip. Try again.');
			console.error('Error deleting trip', error);
			return;
		}

		await this.toastService.success('Trip deleted successfully!');
		this.router.navigate(['/home'], { replaceUrl: true });
	}
}
