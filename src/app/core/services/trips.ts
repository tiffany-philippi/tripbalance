import { Injectable } from '@angular/core';
import { BaseService } from './base';
import { Trip } from 'src/app/models/trip';
import { SupabaseService } from '../supabase';

@Injectable({
	providedIn: 'root',
})
export class TripsService extends BaseService<Trip> {

	constructor(supabase: SupabaseService) {
		super(supabase, 'trips') 
	}

	async getTrips() {
		return this.supabaseService.supabase
			.from('trips')
			.select('*')
			.order('start_date', { ascending: true })
	}

	async getTrip(id: string) {
		return this.supabaseService.supabase
			.from('trip_summary')
			.select('*')
			.eq('id', id)
			.single();
	}

	async getTripDetails(tripId: string) {
		const [trip, categories, expenses] = await Promise.all([
			this.supabaseService.supabase
				.from('trip_summary')
				.select('name, start_date, end_date, total_budget, total_spent')
				.eq('id', tripId)
				.single(),

			this.supabaseService.supabase
				.from('trip_category_summary')
				.select('category_name, color_key, icon, planned, spent')
				.eq('trip_id', tripId),

			this.supabaseService.supabase
				.from('trip_expenses_list')
				.select('*')
				.eq('trip_id', tripId)
				.order('date', { ascending: false })
		]);

		if (trip.error) throw trip.error;
		if (categories.error) throw categories.error;
		if (expenses.error) throw expenses.error;

		return {
			trip: trip.data,
			categories: categories.data,
			expenses: expenses.data
		};
	}
}
