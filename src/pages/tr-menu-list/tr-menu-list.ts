import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
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

  toppings;
  newName: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    platform: Platform,
    public obso: ObsonatorProvider) {

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

  deletePlat(id){
    this.obso.deleteMeals(this.resultLogin.token, id)
  }


  goToChangeName(id: number){
    this.navCtrl.push(ChangeNamePage, {theID: id, token: this.resultLogin.token})
  }

}
