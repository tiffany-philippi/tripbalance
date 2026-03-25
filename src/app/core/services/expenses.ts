import { Injectable } from '@angular/core';
import { BaseService } from './base';
import { Expense } from 'src/app/models/expense';
import { SupabaseService } from '../supabase';

@Injectable({
	providedIn: 'root',
})
export class ExpensesService extends BaseService<Expense> {

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
					name,
					icon
				)
			`)
			.eq('trip_id', tripId)
			.order('date', { ascending: false })

		return { data, error }
	}
}
