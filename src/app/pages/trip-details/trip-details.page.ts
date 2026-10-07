import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderService } from 'src/app/core/services/header';
import { TripsService } from 'src/app/core/services/trips';
import { TripBudgetOverviewComponent } from 'src/app/shared/components/trip-budget-overview/trip-budget-overview.component';
import { BudgetCategoryCardComponent } from "src/app/shared/components/budget-category-card/budget-category-card.component";
import { ExpensesListComponent } from 'src/app/shared/components/expenses-list/expenses-list.component';
import { ToastService } from 'src/app/core/services/toast';
import { TripStateService } from 'src/app/core/services/trip-state';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';


@Component({
	selector: 'app-trip-details',
	templateUrl: './trip-details.page.html',
	styleUrls: ['./trip-details.page.scss'],
	imports: [
		IonicModule,
		TripBudgetOverviewComponent,
		BudgetCategoryCardComponent,
		ExpensesListComponent,
		EmptyStateComponent,
	],
})
export class TripDetailsPage {
	headerService = inject(HeaderService);
	tripState = inject(TripStateService);

	tripId = signal<string>('');
	trip = this.tripState.trip;
	hasBudget = computed(() => (this.trip()?.total_budget ?? 0) > 0);

	loading = signal<boolean>(true);

	public alertButtons = [
		{
			text: 'Cancel',
			role: 'cancel',
		},
		{
			text: 'Delete',
			role: 'confirm',
			handler: () => {
				this.deleteTrip(this.tripId());
			},
		},
	];

	constructor(
		private route: ActivatedRoute,
		private tripsService: TripsService,
		private router: Router,
		private toastService: ToastService
	) { }

	/* Runs on every enter (including coming back from adding an expense), so the trip state is always refreshed */
	async ionViewWillEnter() {
		this.tripId.set(this.route.snapshot.paramMap.get('id') as string);
		await this.loadTrip();
		this.headerService.setHeader(this.trip()?.name ?? 'Details', true);
		this.loading.set(false);
	}

	async loadTrip() {
		const { error } = await this.tripState.load(this.tripId());

		if (error) {
			await this.toastService.error('There was an error loading trip');
			console.error('Error loading trip', error);
		}
	}

	addExpense() {
		this.router.navigate([`trip-details/${this.tripId()}/expense`])
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
