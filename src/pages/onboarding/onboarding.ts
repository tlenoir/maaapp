import { LoginPage } from './../login/login';
import { HomePage } from './../home/home';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
})
export class OnboardingPage {
  goHome: string = "Start";

  database: SQLiteObject;
  skipMsg: string = "Skip";
  checkBox: number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public sqlite: SQLite,
    public platform: Platform) {

      this.platform.ready()
        .then(() => {
          this.initDb()
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnboardingPage');
  }

  initDb() {
    this.sqlite.create({
      name: 'dataOnboarding.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.database = db;
        console.log('create db good')
        this.createOnBoardingTable();

      })
      .catch(e => console.log(e));
  }

  dropOnBoardingtable(): any {
    this.database.executeSql(' DROP TABLE OnBoarding', {})
      .then(() => {
        console.log('tabe OnBoarding dropped');
      })
      .catch(e => console.log(e));

  }

  createOnBoardingTable() {
    this.database.executeSql('CREATE TABLE IF NOT EXISTS OnBoarding (checkValidate TEXT)', {})
      .then(() => {
        console.log('create table good');
        this.checkIfCheckoutIsValidate();

      })
      .catch(e => console.log(e));
  }

  checkIfCheckoutIsValidate() {
    this.database.executeSql('SELECT checkValidate FROM OnBoarding', {})
      .then((data) => {
        if (data.rows.length == 1) this.navCtrl.setRoot(LoginPage);
        console.log('checkValidate', data.rows.length)
      })

  }


  updateCheckBox() {

    if (this.checkBox == 0) this.checkBox++
    else this.checkBox--
    console.log('checkBox', this.checkBox)
  }

  skip() {
    this.skipMsg;

    if (this.checkBox == 1) {
      this.database.executeSql("INSERT INTO OnBoarding(checkValidate) VALUES ('1')", {})
        .then(() => {
          this.navCtrl.setRoot(LoginPage);
          console.log('INSERT INTO OnBoarding(checkValidate) GOOD')

        })
    }
    else this.navCtrl.setRoot(LoginPage)
  }

}
