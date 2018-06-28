import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { ObsonatorProvider } from '../../providers/obsonator';

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

    console.log('id', this.idToChangeName)
   
  }

  updatePlat(){
    this.obso.updateMeals(this.tokenByUser, this.newName, this.idToChangeName)
  }

}
