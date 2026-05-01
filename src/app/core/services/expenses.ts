import { Injectable } from '@angular/core';
import { BaseService } from './base';
import { SupabaseService } from '../supabase';
import { ExpenseItem } from 'src/app/models/trip.model';

@Injectable({
	providedIn: 'root',
})
export class ExpensesService extends BaseService<ExpenseItem> {

	constructor(supabase: SupabaseService) {
		super(supabase, 'expenses')
	}

	async createExpense(expense: any) {
		const { data, error } = await this.supabaseService.supabase
			.from('expenses')
			.insert([expense])
			.select()

		return { data, error }
	}

	async getExpenses(tripId: string) {
		const { data, error } = await this.supabaseService.supabase
			.from('expenses')
			.select(`
				*,
				categories (
					color_key
				)
			`)
			.eq('trip_id', tripId)

		return { data, error }
	}
}
