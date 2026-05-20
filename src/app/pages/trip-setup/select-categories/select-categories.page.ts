import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CategoriesService } from 'src/app/core/services/categories';
import { HeaderService } from 'src/app/core/services/header';
import { ToastService } from 'src/app/core/services/toast';

@Component({
	selector: 'app-select-categories',
	templateUrl: './select-categories.page.html',
	styleUrls: ['./select-categories.page.scss'],
	imports: [CommonModule, IonicModule],
})
export class SelectCategoriesPage implements OnInit {
	defaultCategories: any[] = [];
	selectedIds: string[] = [];
	loadingCategories: boolean = true;
	loadingSubmit: boolean = false;
	tripId!: string;

	constructor(
		private headerService: HeaderService,
		private categoriesService: CategoriesService,
		private toastService: ToastService,
		private route: ActivatedRoute,
		private router: Router,
	) { }

	async ionViewWillEnter() {
		this.headerService.setHeader('Trip Categories', true);
		this.route.paramMap.subscribe(params => {
			this.tripId = params.get('id') as string;
		});
	}

	ngOnInit() {
		this.loadDefaultCategories();
	}

	async loadDefaultCategories() {
		const { data, error } = await this.categoriesService.getDefaultCategories();
		this.loadingCategories = false;

		if (data) this.defaultCategories = data as any;
		if (error) {
			await this.toastService.error('There was an error loading categories');
			console.error('Error loading categories', error);
		}
	}

	isSelected(id: string): boolean {
		return this.selectedIds.includes(id);
	}

	toggleCategory(id: string) {
		if (this.isSelected(id))
			this.selectedIds = this.selectedIds.filter(s => s !== id);
		else this.selectedIds.push(id);
	}

	async confirm() {
		if (this.selectedIds.length === 0) {
			await this.toastService.warning('Select at least one category');
			return;
		}

		this.loadingSubmit = true;

		const { error } = await this.categoriesService.createTripCategories(
			this.tripId,
			this.selectedIds
		);

		this.loadingSubmit = false;

		if (error) {
			await this.toastService.error('Oops, something went wrong. Try again.');
			return;
		}

		this.router.navigate([`/trip-setup/${this.tripId}/budget`]);
	}
}
