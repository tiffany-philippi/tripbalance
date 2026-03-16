import { SupabaseService } from "../supabase"

export abstract class BaseService<T> {

  constructor(
    protected supabaseService: SupabaseService,
    protected table: string
  ) { }

  async getAll() {
    return this.supabaseService.supabase
      .from(this.table)
      .select('*')
  }

  async getById(id: string) {
    return this.supabaseService.supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single()
  }

  async create(item: T) {
    return this.supabaseService.supabase
      .from(this.table)
      .insert([item])
      .select()
  }

  async update(id: string, item: Partial<T>) {
    return this.supabaseService.supabase
      .from(this.table)
      .update(item)
      .eq('id', id)
      .select()
  }

  async delete(id: string) {
    return this.supabaseService.supabase
      .from(this.table)
      .delete()
      .eq('id', id)
  }

}