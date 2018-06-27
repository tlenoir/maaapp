import { Component } from "@angular/core";
import { NavController, NavParams, ToastController, Toast } from "ionic-angular";

/**
 * Generated class for the ColDaysListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



@Component({
  selector: "page-col-days-list",
  templateUrl: "col-days-list.html"
})
export class ColDaysListPage {

  private toastInstance: Toast;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController
  ) {

  }

  presentToast() {

    if(this.toastInstance) {
      return;
    }

    this.toastInstance = this.toastCtrl.create({
      message: 'User was added successfully',
      showCloseButton: true,
      /* position: 'top' */
      closeButtonText: 'Ok'
    });
      this.toastInstance.present();

    this.toastInstance.onDidDismiss(() => {
      this.toastInstance = null;
    });

    this.toastInstance.present();
  }
}
