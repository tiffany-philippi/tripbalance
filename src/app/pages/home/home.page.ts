import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { ToastService } from 'src/app/core/services/toast'
import { TripsService } from 'src/app/core/services/trips'
import { Trip } from 'src/app/models/trip.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [CommonModule, IonicModule],
})
export class HomePage implements OnInit {

  tripsList: Trip[] = []

  constructor(
    private tripsService: TripsService,
    private router: Router,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    await this.loadTrips()
  }

  async loadTrips() {
    const { data, error } = await this.tripsService.getTrips()
    if (data) {
      this.tripsList = data
    }

    if (error) {
      await this.toastService.error('Erro ao carregar viagens');
      console.error('Error loading trips', error);
    }
  }

  openTrip(trip: Trip) {
    this.router.navigate(['/trip-details', trip.id]);
  }

  addTrip() {
    
  }

}