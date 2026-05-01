import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private toastController: ToastController) { }

  async success(message: string) {
    await this.present(message, 'success');
  }

  async error(message: string) {
    await this.present(message, 'danger');
  }

  async warning(message: string) {
    await this.present(message, 'warning');
  }

  private async present(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color,
    });
    await toast.present();
  }
}