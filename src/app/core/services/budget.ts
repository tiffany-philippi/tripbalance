import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase';

@Injectable({
	providedIn: 'root',
})
export class BudgetService {

	constructor(private supabaseService: SupabaseService) { }

	async upsertBudget(budget: any) {
		const { data, error } = await this.supabaseService.supabase
			.from('budgets')
			.upsert(budget)
			.select()

		return { data, error }
	}

	async getBudgets(tripId: string) {
		const { data, error } = await this.supabaseService.supabase
			.from('budgets')
			.select(`
			*,
			categories (
				name,
				icon
			)
		`)
			.eq('trip_id', tripId)

		return { data, error }
	}

	async createBudgets(rows: { trip_id: string; category_id: string; planned_amount: number }[]) {
		const { error } = await this.supabaseService.supabase
			.from('budgets')
			.insert(rows);

		return { error };
	}
}
