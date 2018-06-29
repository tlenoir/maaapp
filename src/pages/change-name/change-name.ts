import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { ObsonatorProvider } from '../../providers/obsonator';
import { TrMenuListPage } from '../tr-menu-list/tr-menu-list';

/**
 * Generated class for the ChangeNamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-change-name',
  templateUrl: 'change-name.html',
})
export class ChangeNamePage {

  idToChangeName: number;
  tokenByUser: string;
  all;
  newName;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
  private obso: ObsonatorProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeNamePage');
  }

  ionViewWillEnter(){

    this.idToChangeName = this.navParams.get('theID')
    this.tokenByUser = this.navParams.get('token')
    this.all = this.navParams.get('exitumLogin')
    

    console.log('id', this.idToChangeName)
   
  }

  updatePlat(){
    this.obso.updateMeals(this.tokenByUser, this.newName, this.idToChangeName)
    this.navCtrl.setRoot(TrMenuListPage, {exitumLogin: this.all});
  }

}
