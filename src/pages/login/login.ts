import { ColWeekListPage } from './../col-week-list/col-week-list';
import { TrMenuListPage } from './../tr-menu-list/tr-menu-list';
import { HomePage } from './../home/home';
import { Success } from './../../providers/model/login';
import { UserData } from './../../providers/user-data';
import { UserOptions } from './../../providers/model/model';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { loginModel } from '../../providers/model/login';
import { HttpErrorResponse } from '@angular/common/http';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    // groupe2.api/api/login?email=tlenoir.tcc@gmail.com&password=azerty

    login: UserOptions = { username: '', password: '' };
    object: loginModel;
    userLoginData: loginModel;
    userIsSucces: Success;
    submitted = false;
    invalidUser = false;
    ngif = false;
    database: SQLiteObject;

    loginArray = [];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public userData: UserData,
        public sqlite: SQLite,
        public platform: Platform) {

        this.platform.ready()
            .then(() => {
                this.initDb()
            })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    onLogin(form: NgForm) {
        this.submitted = true;
        console.log('onLogin()');

        if (form.valid) {
            console.log('form is valid');
            this.userData.login(this.login.username, this.login.password, this.object)
                .subscribe((data: loginModel) => {
                    this.userLoginData = data;
                    this.userIsSucces = this.userLoginData.success;
                    // this.database.executeSql("INSERT INTO `LoginUser` VALUES (?,?)", (this.login.username, this.login.password))
                    //     .then(() => {
                    //         this.navCtrl.setRoot(HomePage, { username: this.login.username, password: this.login.password });
                    //     })

                    if (this.userIsSucces.userstype_id == 1) {

                        this.navCtrl.push(TrMenuListPage, {exitumLogin: this.userIsSucces})
                        
                    } else if (this.userIsSucces.userstype_id == 2) {

                        this.navCtrl.push(ColWeekListPage, {exitumLogin: this.userIsSucces})
                        
                    } else {

                        console.log('is an Assistante bro:', this.userIsSucces.userstype_id)
                        
                    }

                    console.log('login', this.userIsSucces);
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
            name: 'dataLogin.db',
            location: 'default'
        })
            .then((db: SQLiteObject) => {
                this.database = db;
                console.log('create db good')
                this.createLoginUserTable();

            })
            .catch(e => console.log(e));
    }

    dropLoginUsertable(): any {
        this.database.executeSql(' DROP TABLE LoginUser', {})
            .then(() => {
                console.log('tabe LoginUser dropped');
            })
            .catch(e => console.log(e));

    }

    createLoginUserTable() {
        this.database.executeSql('CREATE TABLE IF NOT EXISTS LoginUser (username TEXT, password TEXT)', {})
            .then(() => {
                console.log('create table good');
                this.checkIfLoginUserExist();

            })
            .catch(e => console.log(e));
    }

    checkIfLoginUserExist() {

        this.loginArray = [];
        this.database.executeSql('SELECT * FROM LoginUser', {})
            .then((data) => {
                if (data.rows.length >= 1) {

                    this.ngif = true;
                    this.loginArray.push(data.rows.item(0));
                    this.navCtrl.setRoot(HomePage, { username: this.loginArray[0].username, password: this.login[0].password });
                    
                }
                console.log('checkValidate', data.rows.length)
            })

    }

}