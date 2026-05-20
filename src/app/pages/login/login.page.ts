import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth';
import { HeaderService } from 'src/app/core/services/header';
import { ToastService } from 'src/app/core/services/toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  form: FormGroup = new FormGroup({});
  loadingSubmit = false;

  constructor(
    private authService: AuthService,
    private headerService: HeaderService,
    private toastService: ToastService,
    private router: Router,
  ) { }

  ionViewWillEnter() {
    // V2 - Remove header
    this.headerService.setHeader('TripBalance', false);
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  async signIn() {
    if (this.form.invalid) {
      await this.toastService.warning('Fill in all fields before continuing');
      return;
    }

    this.loadingSubmit = true;

    const { error } = await this.authService.signIn(
      this.form.value.email,
      this.form.value.password
    );

    this.loadingSubmit = false;

    if (error) {
      await this.toastService.error('Invalid email or password');
      console.error('Error: Login', error);
      return;
    }

    this.router.navigate(['/home']);
  }
}