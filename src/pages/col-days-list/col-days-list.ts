import { Success } from './../../providers/model/login';
import { Datum, myMealsObject } from './../../providers/model/myMeals';
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

  resultLogin: Success;
  Datatums: Datum[];
  grosTableau: myMealsObject;

  private toastInstance: Toast;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ColDaysListPage');
  }

  presentToast() {

    if(this.toastInstance) {
      return;
    }

    this.toastInstance = this.toastCtrl.create({
      message: 'Bon ça !',
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
