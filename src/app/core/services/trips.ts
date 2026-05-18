import { Injectable } from '@angular/core';
import { BaseService } from './base';
import { Trip } from 'src/app/models/trip.model'
import { SupabaseService } from './supabase';

@Injectable({
	providedIn: 'root',
})
export class TripsService extends BaseService<Trip> {

	constructor(supabase: SupabaseService) {
		super(supabase, 'trips') 
	}

	async getTrips() {
		return this.supabaseService.supabase
			.from('trip_summary')
			.select('*')
			.order('start_date', { ascending: false })
	}

	async getTrip(id: string) {
		return this.supabaseService.supabase
			.from('trip_summary')
			.select('*')
			.eq('id', id)
			.single();
	}

	async createTrip(trip: Trip) {
		return this.supabaseService.supabase
			.from('trips')
			.insert(trip)
			.select();
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
