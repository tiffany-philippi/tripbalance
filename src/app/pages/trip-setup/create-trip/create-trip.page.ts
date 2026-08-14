import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-step-trip-info',
  templateUrl: './create-trip.page.html',
  styleUrls: ['./create-trip.page.scss', '../trip-setup.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class CreateTripPage implements OnInit {
  @Output() next = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  @Input() data?: any;

  form: FormGroup = new FormGroup({});
  minEndDate: string = new Date().toISOString();

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.data ? this.data.name : '', Validators.required),
      start_date: new FormControl(this.data ? this.data.start_date : new Date().toISOString()),
      end_date: new FormControl(this.data ? this.data.end_date : new Date().toISOString()),
    });
  }

  onStartDateChange(event: any) {
    const selectedDate = event.detail.value;
    this.minEndDate = selectedDate;

    const endDate = this.form.get('end_date')?.value;
    if (endDate && endDate < selectedDate) {
      this.form.get('end_date')?.setValue(selectedDate);
    }
  }

  submit() {
    this.next.emit(this.form.value);
  }
}
