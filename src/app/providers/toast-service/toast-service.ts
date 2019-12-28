import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async presentToast(text: string, color: string = 'warning') {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 3000,
        color,
    });
    toast.present();
  }
}
