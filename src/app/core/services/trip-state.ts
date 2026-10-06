import { Injectable, inject, signal } from '@angular/core';
import { CategorySummaryView, ExpenseItem, TripView } from 'src/app/models/trip.model';
import { CategoriesService } from './categories';
import { ExpensesService } from './expenses';
import { ToastService } from './toast';
import { TripsService } from './trips';

/* State of the trip opened in trip-details, shared with its child components */
@Injectable({
	providedIn: 'root',
})
export class TripStateService {
	private tripsService = inject(TripsService);
	private categoriesService = inject(CategoriesService);
	private expensesService = inject(ExpensesService);
	private toastService = inject(ToastService);

	readonly tripId = signal<string | null>(null);
	readonly trip = signal<TripView | undefined>(undefined);
	readonly categories = signal<CategorySummaryView[] | null>([]);
	readonly categoriesLoading = signal<boolean>(true);
	readonly expenses = signal<ExpenseItem[] | null>([]);
	readonly expensesError = signal<boolean>(false);

	/* Loads or refreshes the trip data. Resolves when the trip itself is loaded; categories and expenses load in the background */
	async load(tripId: string) {
		if (this.tripId() !== tripId) this.reset(tripId);

		this.loadCategories(tripId);
		this.loadExpenses(tripId);
		return this.loadTrip(tripId);
	}

	private reset(tripId: string) {
		this.tripId.set(tripId);
		this.trip.set(undefined);
		this.categories.set([]);
		this.categoriesLoading.set(true);
		this.expenses.set([]);
		this.expensesError.set(false);
	}

	/* Responses from a trip that is no longer the current one are ignored, so data from different trips never mixes */
	private isCurrent(tripId: string) {
		return this.tripId() === tripId;
	}

	private async loadTrip(tripId: string) {
		const { data, error } = await this.tripsService.getTrip(tripId);
		if (!this.isCurrent(tripId)) return { error: null };

		if (data) this.trip.set(data as TripView);
		return { error };
	}

	private async loadCategories(tripId: string) {
		const { data } = await this.categoriesService.getCategories(tripId);
		if (!this.isCurrent(tripId)) return;

		this.categoriesLoading.set(false);
		this.categories.set(data as CategorySummaryView[] | null);
	}

	private async loadExpenses(tripId: string) {
		const { data, error } = await this.expensesService.getExpenses(tripId);
		if (!this.isCurrent(tripId)) return;

		this.expenses.set(data as ExpenseItem[] | null);
		this.expensesError.set(error !== null);

		if (error) {
			await this.toastService.error('Ocorreu um erro ao carregar despesas');
			console.error('Error loading expenses', error);
		}
	}
}
