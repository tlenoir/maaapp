import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the WelcomepagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-welcomepage',
  templateUrl: 'welcomepage.html',
})
export class WelcomepagePage {

  progress = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform) {
      this.platform.ready()
        .then(() => {
          this.redirectToOnBoarding();
        });
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomepagePage');
  }

  redirectToOnBoarding() {
    let limit = 3;
    let counter = 0;
    let myInterval = setInterval(() => {
      counter++;
      console.log('counter', counter);
      this.progress = counter * 100 / limit;
      console.log('progress', this.progress);
      if (counter == limit) {
        clearInterval(myInterval);//Clear c'est Stop/Arreter
        this.navCtrl.setRoot(LoginPage);
      }
    }, 1000);
  }

}
