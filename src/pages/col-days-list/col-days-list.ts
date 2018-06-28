import { menuGetObject } from './../../providers/model/menuGet';
import { ContributorProvider } from './../../providers/contributor';
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

  enterYear1: string;
  enterYear2: string;
  enterYear3: string;
  enterYear4: string;
  enterMonth1: string;
  enterMonth2: string;
  enterDay1: string;
  enterDay2: string;
  enterDate: string;
  enterToken: string;

  date: string;
  datar;
  mealById;


  isTheResult: menuGetObject

  private toastInstance: Toast;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private contr: ContributorProvider
  ) {

  }

  ionViewWillEnter() {



    this.enterYear1 = this.navParams.get('year1')
    this.enterYear2 = this.navParams.get('year2')
    this.enterYear3 = this.navParams.get('year3')
    this.enterYear4 = this.navParams.get('year4')
    this.enterMonth1 = this.navParams.get('month1')
    this.enterMonth2 = this.navParams.get('month2')
    this.enterDay1 = this.navParams.get('day1')
    this.enterDay2 = this.navParams.get('day2')
    this.enterToken = this.navParams.get('token')
    this.enterDate = this.navParams.get('allo')

    console.log('allo', this.enterDate)

    this.date = this.enterDay1 + this.enterDay2 + '-' + this.enterMonth1 + this.enterMonth2 + '-' + this.enterYear1 + this.enterYear2 + this.enterYear3 + this.enterYear4

    console.log('ma date bro', this.date)



    this.getMenu(this.enterToken, this.date)



  }

  getMenu(token, datee) {
    this.contr.getMenuByDate(token, datee)
      .then((data: menuGetObject) => {

        this.mealById = data.data
        console.log('meals', this.mealById)

      })
      .catch(() => {

        if (this.toastInstance) {
          return;
        }
        this.toastInstance = this.toastCtrl.create({
          message: 'Cette date n\'est pas un Lundi',
          showCloseButton: true,
          position: 'top',
          closeButtonText: 'Ok'
        })
        this.toastInstance.present();

        this.toastInstance.onDidDismiss(() => {
          this.toastInstance = null;
        })

        this.toastInstance.present()
      })
  }

  presentToast() {

    if (this.toastInstance) {
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
