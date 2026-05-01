// src/app/core/models/trip.model.ts

export interface Trip {
    id: string;
    name: string;
    start_date: string;
    end_date: string;
    total_spent: number;
    total_budget: number;
}

export interface TripBalance {
    id: string;
    planned: number;
    spent: number;
    balance: number;
}

export interface CategorySummary {
    trip_id: string;
    category_id: string;
    category_name: string;
    color_key: string;
    icon: string;
    planned: number;
    spent: number;
}

export interface ExpenseItem {
    id: string;
    trip_id: string;
    title: string;
    amount: number;
    date: string;
    is_shared: boolean;
    category_id: string;
    split_amount: number;
    category_name: string;
    color_key: string;
}