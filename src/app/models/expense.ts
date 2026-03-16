export interface Expense {
    id?: string
    destination_id: string
    category_id: string
    title: string
    amount: number
    expense_date: string
    notes?: string
    personal_amount?: number
    created_at?: string
    split_amount?: number
    is_shared?: boolean
}
