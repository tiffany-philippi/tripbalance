import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CategoriesService } from 'src/app/core/services/categories';
import { ToastService } from 'src/app/core/services/toast';
import { TripCategory, Category } from 'src/app/models/trip.model';

@Component({
	selector: 'app-step-categories',
	templateUrl: './select-categories.page.html',
	styleUrls: ['./select-categories.page.scss', '../trip-setup.page.scss'],
	imports: [CommonModule, IonicModule],
})
export class SelectCategoriesPage implements OnInit {
	@Output() next = new EventEmitter<TripCategory[]>();
	@Output() prev = new EventEmitter<void>();
	@Output() save = new EventEmitter<TripCategory[]>();
	@Input() data?: Category[];

	defaultCategories: any[] = [];
	selectedIds: string[] = [];
	loadingCategories: boolean = true;

	constructor(
		private categoriesService: CategoriesService,
		private toastService: ToastService,
	) { }

	ngOnInit() {		
		this.loadDefaultCategories();
	}
	
	async loadDefaultCategories() {
		const { data, error } = await this.categoriesService.getDefaultCategories();
		this.loadingCategories = false;
		
		if (data) {
			this.defaultCategories = data as any;
			if (this.data) this.selectedIds = this.data.map(c => c.id);
		}
		if (error) {
			await this.toastService.error('There was an error loading categories');
			console.error('Error loading categories', error);
		}
	}

	isSelected(id: string): boolean {
		return this.selectedIds.includes(id);
	}

	toggleCategory(id: string) {
		if (this.isSelected(id)) {
			this.selectedIds = this.selectedIds.filter(s => s !== id);
		
		} else {
			this.selectedIds.push(id);
		}
	}

	saveData() {
		this.save.emit(this.defaultCategories.filter(c => this.selectedIds.includes(c.id)));
	}

	submit() {
		const selected = this.defaultCategories.filter(c => this.selectedIds.includes(c.id));
		this.next.emit(selected); 
	}
}
