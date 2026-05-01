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
			.order('category_name', { ascending: true })

		return { data, error }
	}
}
