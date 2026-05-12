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
    path: 'trip-setup',
    children: [
      {
        path: 'create',
        loadComponent: () =>
          import('./pages/trip-setup/create-trip/create-trip.page').then(m => m.CreateTripPage)
      },
      {
        path: ':id/categories',
        loadComponent: () =>
          import('./pages/trip-setup/select-categories/select-categories.page').then(m => m.SelectCategoriesPage)
      },
      {
        path: ':id/budget',
        loadComponent: () =>
          import('./pages/trip-setup/create-budget/create-budget.page').then(m => m.CreateBudgetPage)
      },
    ]
  },
  {
    path: 'trip-details/:id/expense',
    loadComponent: () =>
      import('./pages/expenses/create-expense/create-expense.page').then(m => m.CreateExpensePage)
  },
  {
    path: 'trip-details/:id/budget',
    loadComponent: () => 
      import('./pages/trip-setup/create-budget/create-budget.page').then(m => m.CreateBudgetPage)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
