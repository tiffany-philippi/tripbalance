import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Category } from 'src/app/models/trip.model';


@Component({
	selector: 'app-step-budget',
	templateUrl: './create-budget.page.html',
	styleUrls: ['./create-budget.page.scss', '../trip-setup.page.scss'],
	imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class CreateBudgetPage implements OnChanges {
	@Input({ required: true }) selectedCategories!: Category[];
	@Input() data?: { category_id: string; planned_amount: number }[];
	@Input() loadingSubmit = false;
	@Output() next = new EventEmitter<{ category_id: string; planned_amount: number }[]>();
	@Output() prev = new EventEmitter<void>();

	form: FormGroup = new FormGroup({});

	constructor() { }

	ngOnChanges() {
		if (this.selectedCategories?.length) {
			this.buildForm();
		}
	}

	buildForm() {
		const controls: { [key: string]: FormControl } = {};
		this.selectedCategories.forEach(c => {
			controls[c.id] = new FormControl(0, Validators.min(0));
		});
		this.form = new FormGroup(controls);
	}

	submit() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}
		const rows = this.selectedCategories.map(c => ({
			category_id: c.id,
			planned_amount: this.form.value[c.id],
		}));
		this.next.emit(rows);
	}
}