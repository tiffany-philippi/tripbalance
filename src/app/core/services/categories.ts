import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase';

@Injectable({
	providedIn: 'root',
})
export class CategoriesService {
	constructor(private supabaseService: SupabaseService) { }

	async createCategory(category: any) {
		const { data, error } = await this.supabaseService.supabase
			.from('categories')
			.insert([category])
			.select()

		return { data, error }
	}
	async getCategories(tripId: string) {
		const { data, error } = await this.supabaseService.supabase
			.from('trip_category_summary')
			.select('*')
			.eq('trip_id', tripId)
			.order('category_name', { ascending: true });

		return { data, error }
	}

	async getDefaultCategories() {
		const { data, error } = await this.supabaseService.supabase
			.from('categories')
			.select('*')
			.eq('is_default', true)
			.order('name', { ascending: true })

		return { data, error }
	}

	async createTripCategories(tripId: string, categoryIds: string[]) {
		const rows = categoryIds.map(categoryId => ({
			trip_id: tripId,
			category_id: categoryId,
		}));

		const { error } = await this.supabaseService.supabase
			.from('trip_categories')
			.insert(rows);

		return { error };
	}
}
