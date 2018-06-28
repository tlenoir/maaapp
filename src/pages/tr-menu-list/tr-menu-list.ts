import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController } from 'ionic-angular';
import { Success } from '../../providers/model/login';
import { TrAddMenuPage } from '../tr-add-menu/tr-add-menu';
import { ObsonatorProvider } from '../../providers/obsonator';
import { myMealsObject, Datum } from '../../providers/model/myMeals';
import { ChangeNamePage } from '../change-name/change-name';

@Component({
  selector: 'page-tr-menu-list',
  templateUrl: 'tr-menu-list.html',
})
export class TrMenuListPage {

  resultLogin: Success;
  grosTableau: myMealsObject;
  Datatums: Datum[];
  colorDefo: string = '#ffffff';
  toppings;
  newName: string;
  ionicNamedColor: string = 'light';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    platform: Platform,
    public obso: ObsonatorProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

    platform.ready().then(() => {

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrMenuListPage');
  }

  ionViewWillEnter() {
    this.resultLogin = this.navParams.get('exitumLogin');
    this.seePlat();
  }

  goToTrAddMenuPage() {
    this.navCtrl.push(TrAddMenuPage, { exitumLogin: this.resultLogin });
    console.log('Jipé', this.resultLogin);
  }

  seePlat() {
    this.obso.getMyMeals(this.resultLogin.token)
      .then((res: myMealsObject) => {
        this.grosTableau = res
        console.log("Jipé TRMENU", res);
        this.Datatums = this.grosTableau.data
        console.log("Jipé TRMENU", this.grosTableau.data);
      })
      .catch((e) => console.log('error', e));
  }

  deletePlat(id) {
    this.obso.deleteMeals(this.resultLogin.token, id)
    this.loadingSupp()
    setTimeout(() => {
      this.navCtrl.setRoot(TrMenuListPage, { exitumLogin: this.resultLogin });
    }, 2100);

  }


  goToChangeName(id: number) {
    this.navCtrl.push(ChangeNamePage, { theID: id, token: this.resultLogin.token, exitumLogin: this.resultLogin })
  }

  loadingSupp() {
    const loader = this.loadingCtrl.create({
      content: "Suppression...",
      duration: 2000
    });
    loader.present();
  }

  toggleNamedColor(): void {
    if(this.ionicNamedColor === 'light') {
      this.ionicNamedColor = 'primary'
    } else {
      this.ionicNamedColor = 'light'
    }
  }

}
