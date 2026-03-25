import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CategoriesService } from 'src/app/core/services/categories';
import { ExpensesService } from 'src/app/core/services/expenses';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.page.html',
  styleUrls: ['./create-expense.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class CreateExpensePage implements OnInit {
  form: FormGroup = new FormGroup({});
  categories: Category[] = [];
  trip_id: string | null = '';

  async ionViewWillEnter() {
    this.route.paramMap.subscribe(params => {
      this.trip_id = params.get('id');
      this.loadCategories();
    });
  }
  constructor(
    private expensesService: ExpensesService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
  ) { }

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
    if (status) {
      this.form.get('split_amount')?.enable()
    } else {
      this.form.get('split_amount')?.disable()
    }
  }

  async loadCategories() {
    const { data, error } = await this.categoriesService.getCategories(this.trip_id!)
    if (data) {
      this.categories = data
    }
  }

  async createExpense() {
    console.log('form', this.form.value)

    const {data, error} = await this.expensesService.createExpense({...this.form.value, trip_id:this.trip_id});
    if (error) {
      console.error('error', error)
    }
    if (data) {
      console.log('data', data)
    }
  }
}