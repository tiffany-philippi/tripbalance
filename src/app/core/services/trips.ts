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

	// async getTotalSpent(tripId: string) {
	// 	const { data } = await this.supabaseService.supabase
	// 		.from('expenses')
	// 		.select('amount')
	// 		.eq('destination_id', tripId)

	// 	const total = data?.reduce(
	// 		(sum, e) => sum + Number(e.amount),
	// 		0
	// 	)

	// 	return total
	// }

	// async getTotalBudget(tripId: string) {
	// 	const { data } = await this.supabaseService.supabase
	// 		.from('budgets')
	// 		.select('planned_amount')
	// 		.eq('trip_id', tripId)

	// 	const total = data?.reduce(
	// 		(sum, b) => sum + Number(b.planned_amount),
	// 		0
	// 	)

	// 	return total
	// }
}
