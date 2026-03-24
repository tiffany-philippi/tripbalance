import { Category } from "./category";
import { Expense } from "./expense";
import { Trip } from "./trip";

export interface TripDetails {
    trip: Trip;
    categories: Category[];
    expenses: Expense[];
}