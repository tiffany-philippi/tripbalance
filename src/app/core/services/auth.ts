import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from './supabase';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private supabaseService: SupabaseService,
    private router: Router,
  ) { }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabaseService.supabase.auth
      .signInWithPassword({ email, password });
    return { data, error };
  }

  async signOut() {
    const { error } = await this.supabaseService.supabase.auth.signOut();
    if (!error) this.router.navigate(['/login']);
    return { error };
  }

  async getSession() {
    const { data, error } = await this.supabaseService.supabase.auth.getSession();
    return { data, error };
  }

  async isAuthenticated(): Promise<boolean> {
    const { data } = await this.supabaseService.supabase.auth.getSession();

    if (data.session) return true;

    const { data: refreshData } = await this.supabaseService.supabase.auth.refreshSession();
    return !!refreshData.session;
  }
}