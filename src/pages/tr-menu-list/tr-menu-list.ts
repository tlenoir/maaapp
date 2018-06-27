import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { TrAddMenuPage } from '../tr-add-menu/tr-add-menu';

@Component({
  selector: 'page-tr-menu-list',
  templateUrl: 'tr-menu-list.html',
})
export class TrMenuListPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    platform: Platform) {

    platform.ready().then(() => {

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrMenuListPage');
  }

  goToTrAddMenuPage() {
    this.navCtrl.push(TrAddMenuPage);
  }

}
