import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async presentToast(text: string, isError: boolean) {
    let toast: HTMLIonToastElement;
    if (!isError) {
      toast = await this.toastController.create({
        message: text,
        position: 'middle',
        duration: 3000,
      })
    } else {
      toast = await this.toastController.create({
        message: text,
        position: 'middle',
        buttons: [{
            text: 'Ok',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      })
    }
    toast.present();
  }
}
