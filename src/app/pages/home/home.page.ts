import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { HeaderService } from 'src/app/core/services/header'
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
  loading: boolean = true

  constructor(
    private tripsService: TripsService,
    private router: Router,
    private toastService: ToastService,
    private headerService: HeaderService,
  ) { }

  ionViewWillEnter() {
    this.headerService.setHeader('Minhas Viagens', false);
  }

  async ngOnInit() {
    await this.loadTrips()
  }

  async loadTrips() {
    const { data, error } = await this.tripsService.getTrips()
    this.loading = false;
    
    if (data) this.tripsList = data;
    if (error) {
      await this.toastService.error('Erro ao carregar viagens');
      console.error('Error loading trips', error);
    }
  }

  openTrip(trip: Trip) {
    this.router.navigate(['/trip-details', trip.id]);
  }
}