import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';


@Component({
  selector: 'page-tr-add-menu',
  templateUrl: 'tr-add-menu.html',
})
export class TrAddMenuPage {

  zeudate = '2018-09-02';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    platform: Platform) {

    platform.ready().then(() => {

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrAddMenuPage');
  }

  calculateTime(offset: any) {
    // create Date object for current location
    let d = new Date();

    // create new Date object for different city
    // using supplied offset
    let nd = new Date(d.getTime() + (3600000 * offset));

    return nd.toISOString();
  }

}
