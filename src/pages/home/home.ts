import { TrMenuListPage } from './../tr-menu-list/tr-menu-list';
import { ColDaysListPage } from './../col-days-list/col-days-list';
import { Success } from './../../providers/model/login';
import { UserData } from './../../providers/user-data';
import { CreateUsersModels } from './../../providers/model/model';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { loginModel } from '../../providers/model/login';
import { HttpErrorResponse } from '@angular/common/http';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  notifications;
    createAccount: CreateUsersModels = { lname: '', fname: '', email: '', password: '', c_password: '', userType_id: ''};
    object: loginModel; //Pour la création de compte
    userLoginData: loginModel;
    userIsSucces: Success;
    submitted = false;
    invalidUser = false;
    ngif = false;
    database: SQLiteObject;

    loginArray = [];
    template;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public userData: UserData,
    public sqlite: SQLite,
    public platform: Platform,
  ) {
    this.platform.ready().then(() => {

    });
  }
  

  launchTraiteur() {
    this.navCtrl.push(TrMenuListPage);
  }

  launchColabo() {
    this.navCtrl.push(ColDaysListPage);
  }
  /* goToLoginPage(name:string){

    console.log('name', name)
    this.navCtrl.push(LoginPage, {'name':name});

  } */

}
