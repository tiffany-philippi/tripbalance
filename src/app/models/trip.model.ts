export interface TripView {
    id: string;
    name: string;
    location: string;
    picture: string;
    start_date: string;
    end_date: string;
    total_spent: number;
    total_budget: number;
    status: string;
    created_by: string;
}

export interface CreateTrip {
    name: string;
    start_date: string;
    end_date: string;
    status?: string;
    created_by?: string;
}

export interface TripBalance {
    id: string;
    planned: number;
    spent: number;
    balance: number;
}

export interface Category {
    id: string;
    name: string;
    icon: string;
    color_key: string;
    is_default: boolean;
    user_id: string | null;
}

export interface CategorySummaryView {
    category_id: string;
    category_name: string;
    color_key: string;
    icon: string;
    planned: number;
    spent: number;
}

export interface TripCategory {
    id: string;
    trip_id: string;
    category_id: string;
}

export interface CategoryColorKey {
    color_key: string;
}

export interface ExpenseItem {
    id: string;
    trip_id: string;
    title: string;
    amount: number;
    expense_date: string;
    is_shared: boolean;
    category_id: string;
    split_amount: number;
    categories: CategoryColorKey;
}