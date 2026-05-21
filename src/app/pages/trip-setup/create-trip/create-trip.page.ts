import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderService } from 'src/app/core/services/header';
import { ToastService } from 'src/app/core/services/toast';
import { TripsService } from 'src/app/core/services/trips';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.page.html',
  styleUrls: ['./create-trip.page.scss', '../trip-setup.scss'],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class CreateTripPage implements OnInit {
  form: FormGroup = new FormGroup({});
  loading: boolean = true;
  loadingSubmit: boolean = false;

  constructor(
    private headerService: HeaderService,
    private tripsService: TripsService,
    private toastService: ToastService,
    private router: Router,
  ) { }


  async ionViewWillEnter() {
    this.headerService.setHeader('New Trip', true);
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      start_date: new FormControl(new Date().toISOString()),
      end_date: new FormControl(new Date().toISOString()),
    });
  }

  async createTrip() {
    if (this.form.invalid) {
      this.toastService.warning('Invalid form');
      return;
    }

    this.loadingSubmit = true;

    const { data, error } = await this.tripsService.createTrip({...this.form.value});

    this.loadingSubmit = false;

    if (data) {
      this.form.reset();
      await this.toastService.success('Trip created successfully!');
      this.router.navigate([`/trip-setup/${data[0].id}/categories`]);
    }

    if (error) {
      await this.toastService.error('A error occurred while creating trip. Try again.');
      console.error('Error: Create Trip - Submit form', error)
    }
  }

}
