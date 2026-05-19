import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from './supabase';
import { ToastService } from './toast';

@Injectable({ providedIn: 'root' })
export class AuthService {
  loggedIn = signal<boolean>(false);
  
  constructor(
    private supabaseService: SupabaseService,
    private router: Router,
    private toastService: ToastService
  ) { 
    this.supabaseService.supabase.auth.onAuthStateChange((event, session) => {
      this.loggedIn.set(!!session);
    });
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabaseService.supabase.auth
      .signInWithPassword({ email, password });
    return { data, error };
  }

  async signOut() {
    const { error } = await this.supabaseService.supabase.auth.signOut();
    if (!error) {
      this.router.navigate(['/login']);
      this.toastService.success('You have been logged out!');
    }
    return { error };
  }

  async getSession() {
    const { data, error } = await this.supabaseService.supabase.auth.getSession();
    return { data, error };
  }

  async isAuthenticated(): Promise<boolean> {
    const { data, error } = await this.supabaseService.supabase.auth.getSession();

    if (error) {
      this.toastService.error('Oops, something went wrong');
      return false;
    }
    if (data.session) return true;

    const { data: refreshData, error: refreshError } = await this.supabaseService.supabase.auth.refreshSession();

    if (refreshError) {
      this.toastService.error('Oops, something went wrong');
      return false;
    }
    return !!refreshData.session;
  }
}