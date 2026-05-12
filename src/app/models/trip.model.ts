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