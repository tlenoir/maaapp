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


  createAccount: CreateUsersModels = { lname: '', fname: '', email: '', password: '', c_password: '', userType_id: '' };
  object: loginModel; //Pour la création de compte
  userCreateData: loginModel;
  userIsSucces: Success;
  submitted = false;
  invalidUser = false;
  ngif = false;
  database: SQLiteObject;

  createAccountArray = [];
  template;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public userData: UserData,
    public sqlite: SQLite,
    public platform: Platform,
  ) {
    this.platform.ready()
      .then(() => {
        this.initDb()
      })
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


  onLogin(form: NgForm) {
    this.submitted = true;
    console.log('onLogin()');

    if (form.valid) {
      console.log('form is valid');
      this.userData.create(this.createAccount.fname, this.createAccount.lname, this.createAccount.email, this.createAccount.password, this.createAccount.c_password, this.createAccount.userType_id, this.object)
        /* .map((res) => {
          JSON.stringify(res);
          
        }); */
        .subscribe((data: loginModel) => {
          this.userCreateData = data;
          this.userIsSucces = this.userCreateData.success;



          // this.database.executeSql("INSERT INTO `LoginUser` VALUES (?,?)", (this.login.username, this.login.password))
          //     .then(() => {
          //         this.navCtrl.setRoot(HomePage, { username: this.login.username, password: this.login.password });
          //     })



          console.log('Create', this.userIsSucces);
        }, (error: HttpErrorResponse) => {
          this.invalidUser = true;
          console.log(error.message);
        })
    }


  }

  onSignup() {
  }

  initDb() {
    this.sqlite.create({
      name: 'dataCreateAccount.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.database = db;
        console.log('create db good')
        this.createCreateAccountTable();

      })
      .catch(e => console.log(e));
  }

  dropCreateAccounttable(): any {
    this.database.executeSql(' DROP TABLE CreateAccount', {})
      .then(() => {
        console.log('tabe CreateAccount dropped');
      })
      .catch(e => console.log(e));

  }

  createCreateAccountTable() {
    this.database.executeSql('CREATE TABLE IF NOT EXISTS CreateAccount (lname TEXT, fname TEXT, mail TEXT, password TEXT, c_password TEXT, usertype_id TEXT)', {})
      .then(() => {
        console.log('create table good');
        this.checkIfCreateAccountExist();

      })
      .catch(e => console.log(e));
  }

  checkIfCreateAccountExist() {

    this.createAccountArray = [];
    this.database.executeSql('SELECT * FROM CreateAccount', {})
      .then((data) => {
        if (data.rows.length >= 1) {

          this.ngif = true;
          this.createAccountArray.push(data.rows.item(0));
          this.navCtrl.setRoot(HomePage, { lname: this.createAccountArray[0].lname, fname: this.createAccountArray[0].fname, mail: this.createAccountArray[0].mail, password: this.createAccountArray[0].password, c_password: this.createAccount[0].c_password, userType_id: this.createAccountArray[0].userType_id });

        }
        console.log('checkValidate', data.rows.length)
      })

  }

}
