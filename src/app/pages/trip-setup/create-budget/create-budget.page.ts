import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BudgetService } from 'src/app/core/services/budget';
import { CategoriesService } from 'src/app/core/services/categories';
import { HeaderService } from 'src/app/core/services/header';
import { ToastService } from 'src/app/core/services/toast';
import { TripsService } from 'src/app/core/services/trips';
import { CategorySummary } from 'src/app/models/trip.model';

@Component({
	selector: 'app-create-budget',
	templateUrl: './create-budget.page.html',
	styleUrls: ['./create-budget.page.scss', '../trip-setup.scss'],
	imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class CreateBudgetPage {
	categories: CategorySummary[] = [];
	form: FormGroup = new FormGroup({});
	tripId!: string;
	loadingData: boolean = true;
	loadingSubmit: boolean = false;
	isEditMode: boolean = false;

	constructor(
		private headerService: HeaderService,
		private categoriesService: CategoriesService,
		private budgetService: BudgetService,
		private tripsService: TripsService,
		private toastService: ToastService,
		private route: ActivatedRoute,
		private router: Router,
	) { }

	ionViewWillEnter() {
		this.headerService.setHeader('Set Budget', true);
		this.route.paramMap.subscribe(async params => {
			this.tripId = params.get('id') as string;
			this.loadCategories();
		});

		this.route.queryParamMap.subscribe(params => {
			this.isEditMode = params.get('mode') === 'edit';
		});
	}

	async loadCategories() {
		const { data, error } = await this.categoriesService.getCategories(this.tripId);

		if (error) {
			await this.toastService.error('There was an error loading categories');
			console.error('Error loading categories', error);
			return;
		}

		this.categories = data as CategorySummary[];
		this.buildForm();
		this.loadingData = false;
	}

	buildForm() {
		const controls: { [key: string]: FormControl } = {};
		this.categories.forEach(category => {
			controls[category.category_id] = new FormControl(0, [
				Validators.required,
				Validators.min(0),
			]);
		});
		this.form = new FormGroup(controls);
	}

	async saveBudget() {
		if (this.form.invalid) {
			await this.toastService.warning('Fill in all fields before continuing');
			return;
		}

		this.loadingSubmit = true;

		const rows = this.categories.map(category => ({
			trip_id: this.tripId,
			category_id: category.category_id,
			planned_amount: this.form.value[category.category_id],
		}));

		const { error } = await this.budgetService.createBudgets(rows);

		this.loadingSubmit = false;

		if (error) {
			await this.toastService.error('Oops, something went wrong. Try again.');
			console.error('Error saving budget', error);
			return;
		}

		if (!this.isEditMode) {
			const { error: activateError } = await this.tripsService.activateTrip(this.tripId);

			if (activateError) {
				await this.toastService.error('Budget saved, but activating the trip failed. Try again.');
				console.error('Error activating trip', activateError);
				return;
			}
		}

		await this.toastService.success('Budget saved successfully!');
		this.router.navigate([`/trip-details/${this.tripId}`]);
	}
}