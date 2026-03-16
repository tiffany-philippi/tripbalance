import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { TripsService } from 'src/app/core/services/trips'
import { Trip } from 'src/app/models/trip'

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
  imports: [CommonModule, IonicModule],
})
export class TripsPage implements OnInit {

  trips: Trip[] = []

  constructor(
    private tripsService: TripsService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.loadTrips()
  }

  async loadTrips() {
    const { data, error } = await this.tripsService.getTrips()
    if (data) {
      this.trips = data
    }
  }

  openTrip(trip: Trip) {
    this.router.navigate(['/trips/details', trip.id]);
  }

  addTrip() {
    this.router.navigate(['/create-trip'])
  }

}