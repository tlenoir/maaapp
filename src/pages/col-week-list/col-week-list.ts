import { FormGroup } from '@angular/forms';
import { Success } from './../../providers/model/login';
import { ColDaysListPage } from './../col-days-list/col-days-list';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ColWeekListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-col-week-list',
  templateUrl: 'col-week-list.html',
})
export class ColWeekListPage {

  form: FormGroup;
  dataInicial: any;
  maxDate: string;

  resultLogin: Success;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ColWeekListPage');
  }

  ionViewWillEnter(){

    this.resultLogin = this.navParams.get('exitumLogin');
    console.log('email', this.resultLogin.email)
   
  }

  @ViewChild('datePicker') datePicker;
  open() {
    if (!this.dataInicial) {
      this.dataInicial = new Date().toJSON().split('T')[0];
      setTimeout(() => {
        this.datePicker.open();
      }, 50)
    } else {
      this.datePicker.open();
    }
  }


  launchDaysPage()  {
    this.navCtrl.push(ColDaysListPage);
  }
}
