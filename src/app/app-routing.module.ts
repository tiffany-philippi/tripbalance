import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'trips',
    pathMatch: 'full'
  },

  {
    path: 'trips',
    loadComponent: () =>
      import('./pages/trips/trips.page').then(m => m.TripsPage)
  },
  {
    path: 'trips/details/:id',
    loadComponent: () =>
      import('./pages/trips/trip-details/trip-details.page').then(m => m.TripDetailsPage)
  },
  {
    path: 'create-trip',
    loadComponent: () =>
      import('./pages/trips/create-trip/create-trip.page').then(m => m.CreateTripPage)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
