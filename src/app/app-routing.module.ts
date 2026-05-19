import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

const routes: Routes = [
	{
		path: 'login',
		loadComponent: () =>
			import('./pages/login/login.page').then(m => m.LoginPage)
	},
	{
		path: 'home',
		canActivate: [authGuard],
		loadComponent: () =>
			import('./pages/home/home.page').then(m => m.HomePage)
	},
	{
		path: 'trip-details/:id',
		canActivate: [authGuard],
		loadComponent: () =>
			import('./pages/trip-details/trip-details.page').then(m => m.TripDetailsPage)
	},
	{
		path: 'trip-setup',
		children: [
			{
				path: 'create',
				canActivate: [authGuard],
				loadComponent: () =>
					import('./pages/trip-setup/create-trip/create-trip.page').then(m => m.CreateTripPage)
			},
			{
				path: ':id/categories',
				canActivate: [authGuard],
				loadComponent: () =>
					import('./pages/trip-setup/select-categories/select-categories.page').then(m => m.SelectCategoriesPage)
			},
			{
				path: ':id/budget',
				canActivate: [authGuard],
				loadComponent: () =>
					import('./pages/trip-setup/create-budget/create-budget.page').then(m => m.CreateBudgetPage)
			},
		]
	},
	{
		path: 'trip-details/:id/expense',
		canActivate: [authGuard],
		loadComponent: () =>
			import('./pages/expenses/create-expense/create-expense.page').then(m => m.CreateExpensePage)
	},
	{
		path: 'trip-details/:id/budget',
		canActivate: [authGuard],
		loadComponent: () =>
			import('./pages/trip-setup/create-budget/create-budget.page').then(m => m.CreateBudgetPage)
	},
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
