import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'trip-details/:id',
    loadComponent: () =>
      import('./pages/trip-details/trip-details.page').then(m => m.TripDetailsPage)
  },
  {
    path: 'create-trip',
    loadComponent: () =>
      import('./pages/create-trip/create-trip.page').then(m => m.CreateTripPage)
  },
  {
    path: 'trip-details/:id/create-expense',
    loadComponent: () =>
      import('./pages/expenses/create-expense/create-expense.page').then(m => m.CreateExpensePage)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
