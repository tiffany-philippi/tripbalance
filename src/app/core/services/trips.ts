import { Injectable } from '@angular/core';
import { BaseService } from './base';
import { CreateTrip, TripView } from 'src/app/models/trip.model'
import { SupabaseService } from './supabase';

@Injectable({
	providedIn: 'root',
})
export class TripsService extends BaseService<TripView> {

	constructor(supabase: SupabaseService) {
		super(supabase, 'trips') 
	}

	async getTrips() {
		return this.supabaseService.supabase
			.from('trip_summary')
			.select('*')
			.eq('status', 'active')
			.order('start_date', { ascending: false })
	}

	async getTrip(id: string) {
		return this.supabaseService.supabase
			.from('trip_summary')
			.select('*')
			.eq('id', id)
			.single();
	}

	async createTrip(trip: CreateTrip) {
		return this.supabaseService.supabase
			.from('trips')
			.insert(trip)
			.select();
	}

	async activateTrip(tripId: string) {
		return this.supabaseService.supabase
			.from('trips')
			.update({ status: 'active' })
			.eq('id', tripId);
	}

	async deleteTrip(tripId: string) {
		return this.supabaseService.supabase
			.from('trips')
			.delete()
			.eq('id', tripId);
	}

	getSavingsClass(planned: number, spent: number) {
		if (this.isMoreThanZero(planned - spent)) {
			return 'trip-savings';
		} else return 'trip-overbudget';
	}

	isMoreThanZero(value: number) {
		return value >= 0;
	}
}
