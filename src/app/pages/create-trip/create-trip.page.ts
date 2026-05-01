import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.page.html',
  styleUrls: ['./create-trip.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class CreateTripPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
