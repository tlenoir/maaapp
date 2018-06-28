import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ObsonatorProvider } from '../../providers/obsonator';
import { TrMenuListPage } from '../tr-menu-list/tr-menu-list';

@Component({
  selector: 'page-change-name',
  templateUrl: 'change-name.html',
})
export class ChangeNamePage {

  idToChangeName: number;
  tokenByUser: string;
  all;
  newName;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private obso: ObsonatorProvider,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeNamePage');
  }

  ionViewWillEnter() {

    this.idToChangeName = this.navParams.get('theID')
    this.tokenByUser = this.navParams.get('token')
    this.all = this.navParams.get('exitumLogin')


    console.log('id', this.idToChangeName)

  }

  updatePlat() {
    this.obso.updateMeals(this.tokenByUser, this.newName, this.idToChangeName)
    this.loadingModif()
    setTimeout(() => {
      this.navCtrl.setRoot(TrMenuListPage, { exitumLogin: this.all });
    }, 2100);
  }

  loadingModif() {
    const loader = this.loadingCtrl.create({
      content: "Modif en cours...",
      duration: 2000
    });
    loader.present();
  }

}
