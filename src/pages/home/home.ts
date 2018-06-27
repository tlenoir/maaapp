import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }


  goToLoginPage(name:string){

    console.log('name', name)
    this.navCtrl.push(LoginPage, {'name':name});

  }

}
