import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { HeaderService } from 'src/app/core/services/header'
import { ToastService } from 'src/app/core/services/toast'
import { TripsService } from 'src/app/core/services/trips'
import { TripView } from 'src/app/models/trip.model'
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    CommonModule, 
    IonicModule,
    EmptyStateComponent,
  ],
})
export class HomePage {

  tripsList: TripView[] = []
  loading: boolean = true

  constructor(
    private tripsService: TripsService,
    private router: Router,
    private toastService: ToastService,
    private headerService: HeaderService,
  ) { }

  async ionViewWillEnter() {
    this.headerService.setHeader('My Trips', false);
    await this.loadTrips()
  }

  async loadTrips() {
    const { data, error } = await this.tripsService.getTrips()
    this.loading = false;
    
    if (data) this.tripsList = data;
    if (error) {
      await this.toastService.error('There was an error loading trips');
      console.error('Error loading trips', error);
    }
  }

  openTrip(trip: TripView) {
    this.router.navigate(['/trip-details', trip.id]);
  }

  createTrip() {
    this.router.navigate(['/trip-setup/create']);
  }
}