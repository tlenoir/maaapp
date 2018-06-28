import { ObsonatorProvider } from './../../providers/obsonator';
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
    template;
    tokenByUser = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNkNGFkYzNiMWUzYzlkYTI2NjAyYWQ1YWM2OGYxNGQ2NzBkODg4OTUzYzIwMzZjYzA2YTVhZGYzNDA4ZmZkYWQwOTFkYWM0MjNlMTFjMzRkIn0.eyJhdWQiOiIxIiwianRpIjoiY2Q0YWRjM2IxZTNjOWRhMjY2MDJhZDVhYzY4ZjE0ZDY3MGQ4ODg5NTNjMjAzNmNjMDZhNWFkZjM0MDhmZmRhZDA5MWRhYzQyM2UxMWMzNGQiLCJpYXQiOjE1MzAxMzU1MTEsIm5iZiI6MTUzMDEzNTUxMSwiZXhwIjoxNTYxNjcxNTExLCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.ul3-PXvlf9AD3Xs71Sf2UxAGW1_XzhJycJWu3AUwL8qmDnFnwNFuBcyGMWkW4xjYAABZe7TyI57AeVCmh37JE8Rv0tdzuof_RbIPDNLYjGCaFd67zrhVAcYKHYbmiDGNJvaX4tXMhLDUI01fdaJvLgs79iFaLHU97qoM1nC4nj-Aq4_nbEUKD-1ft1xBjdbpUwIr3SguaUnUUvei9fXjVMUz-9LMi127LmeqOoue1PNsZvNoAzVPhUcl6lsSH1SF--1aJzEfp0Q3oxCSBtNXSyA6c2Kp_nzrHLkvHrh_QhlHThxVZ8I7f9qxLsJxlGsn13-ulqCTYmcbc4EtQP1gm1ZWu-Lez5cDYaiEBaXox7_0KM4oqXvOVZtF3Ht4PRR54dUieZ8VSNfZkZJ-PrpeZvRup1JurpJ8hoamKUcLJX3u3-40TWThbf5PJrp4bWfUSZGIT3C4Szw2xGyl5k8ED1wnxmsQ_bcJrEZYnGPkQ-jX2_0tka2L7oaq3LAK1249GQYu_fegrWPdcKlBvV-lf5mofd_l19FRVW4LTcyfEfmnRuDOvSnQmETgepsCN8qFZ49HZyZuJXX1HZUjTu99HzGdKRx6sZi1pxX7P3X9J9UNf7C6lY3Z4-zFJzZ_YM_I_2xuBdHB5iFQQAUis04BGEbHr-FOfqqBG-nfZcg4XX0'


    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public userData: UserData,
        public sqlite: SQLite,
        public platform: Platform,
        public ObsoPro: ObsonatorProvider) {

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


                    this.ObsoPro.getMyMeals(this.userIsSucces.token)
                        .then(data => {

                            this.template = data;

                            console.log('data', this.template)

                        })
                    // this.database.executeSql("INSERT INTO `LoginUser` VALUES (?,?)", (this.login.username, this.login.password))
                    //     .then(() => {
                    //         this.navCtrl.setRoot(HomePage, { username: this.login.username, password: this.login.password });
                    //     })

                    if (this.userIsSucces.userstype_id == 1) {

                        this.navCtrl.push(TrMenuListPage, { exitumLogin: this.userIsSucces })

                    } else if (this.userIsSucces.userstype_id == 2) {

                        this.navCtrl.push(ColWeekListPage, { exitumLogin: this.userIsSucces })

                    } else {

                        this.navCtrl.push(HomePage, { exitumLogin: this.userIsSucces })

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
