import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExpensesService } from 'src/app/core/services/expenses';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class ExpensesListComponent implements OnChanges {
  @Input( { required: true } ) tripId!: string | null;

  loading: boolean = true;
  hasError: boolean = false;
  expenses: any[] = [];


  constructor(private expensesService: ExpensesService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tripId']?.currentValue) {
      this.loadExpenses();
    }
  }
  async loadExpenses() {
    const { data, error } = await this.expensesService.getExpenses(this.tripId!);

    this.loading = false;
    this.expenses = data!;
    this.hasError = error !== null;
  }

  splitAmount(amount: number, split: number) {
    return (amount / split).toFixed(2);
  }
}
