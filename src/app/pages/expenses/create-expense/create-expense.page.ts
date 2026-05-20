import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CategoriesService } from 'src/app/core/services/categories';
import { ExpensesService } from 'src/app/core/services/expenses';
import { HeaderService } from 'src/app/core/services/header';
import { ToastService } from 'src/app/core/services/toast';
import { CategorySummary } from 'src/app/models/trip.model';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.page.html',
  styleUrls: ['./create-expense.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class CreateExpensePage implements OnInit {
  form: FormGroup = new FormGroup({});
  categories: CategorySummary[] = [];
  trip_id: string | null = '';
  loadingSubmit = false;
  loadingData = true;

  constructor(
    private expensesService: ExpensesService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private headerService: HeaderService
  ) { }

  async ionViewWillEnter() {
    this.route.paramMap.subscribe(params => {
      this.trip_id = params.get('id');
      this.loadCategories();
      this.headerService.setHeader('New Expense', true);
    });
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      amount: new FormControl(0, Validators.required),
      category_id: new FormControl('', Validators.required),
      is_shared: new FormControl(false),
      split_amount: new FormControl(1),
      expense_date: new FormControl(new Date().toISOString(), Validators.required),
      notes: new FormControl(''),
    })
    this.changeCounterStatus(this.form.value.is_shared)
  }

  changeCounterStatus(status: boolean) {
    if (status) this.form.get('split_amount')?.enable()
    else this.form.get('split_amount')?.disable()
  }

  async loadCategories() {
    const { data, error } = await this.categoriesService.getCategories(this.trip_id!)
    this.loadingData = false;
    if (data) this.categories = data as any

    if (error) {
      await this.toastService.error('There was an error loading categories');
      console.error('Error loading categories', error);
    }
  }

  async createExpense() {
    if (this.form.invalid) {
      this.toastService.warning('Fill in all fields before continuing');
      return;
    }

    this.loadingSubmit = true;

    const { data, error } = await this.expensesService.createExpense({ ...this.form.value, trip_id: this.trip_id });
    this.loadingSubmit = false;

    if (data) {
      this.form.reset();
      await this.toastService.success('Expense created successfully!');
      this.router.navigate([`/trip-details/${this.trip_id}`]);
    }

    if (error) {
      await this.toastService.error('Oops, something went wrong');
      console.error('Error: Create Expense - Submit form', error)
    }
  }
}