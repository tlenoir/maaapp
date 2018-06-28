import { loginModel } from './model/login';
import { Injectable } from '@angular/core';

// import { Events } from 'ionic-angular';
// import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  urlLogin = 'http://groupe2.api/api/login';
  urlCreate = 'http://groupe2.api/api/register'
  // groupe2.api/api/login?email=tlenoir.tcc@gmail.com&password=azerty

  constructor(
    // public events: Events,
    // public storage: Storage,
    public http: HttpClient
  ) {}

  // hasFavorite(sessionName: string): boolean {
  //   return (this._favorites.indexOf(sessionName) > -1);
  // };

  // addFavorite(sessionName: string): void {
  //   this._favorites.push(sessionName);
  // };

  // removeFavorite(sessionName: string): void {
  //   let index = this._favorites.indexOf(sessionName);
  //   if (index > -1) {
  //     this._favorites.splice(index, 1);
  //   }
  // };

  login(username: string, password: string, login: loginModel) {

    let email = '?email=';
    let passwd = '&password=';

    return this.http.post(this.urlLogin + email + username + passwd + password, login)
    
  };

  // http://groupe2.api/api/register?fname=Christophe&lname=Pezar&email=cpezar@gmail.com&password=azerty&c_password=azerty&userstype_id=2
  create(fname: string, lname: string, email: string, password: string, c_password: string, userType_id: any, login: loginModel) {

    let fn = '?fname='
    let ln = '&lname='
    let em = '&email='
    let pass = '&password='
    let cPass = '&c_password='
    let userType = '&userstype_id='

    return this.http.post(this.urlCreate + fn + fname + ln + lname + em + email + pass + password + cPass + c_password + userType + userType_id, login)
    /* console.log(this.urlCreate + fn + fname + ln + lname + em + email + pass + password + cPass + c_password + userType + userType_id, login ) */
  };

  // signup(username: string): void {
  //   this.storage.set(this.HAS_LOGGED_IN, true);
  //   this.setUsername(username);
  //   this.events.publish('user:signup');
  // };

  // logout(): void {
  //   this.storage.remove(this.HAS_LOGGED_IN);
  //   this.storage.remove('username');
  //   this.events.publish('user:logout');
  // };

  // setUsername(username: string): void {
  //   this.storage.set('username', username);
  // };

  // getUsername(): Promise<string> {
  //   return this.storage.get('username').then((value) => {
  //     return value;
  //   });
  // };

  // hasLoggedIn(): Promise<boolean> {
  //   return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
  //     return value === true;
  //   });
  // };

  // checkHasSeenTutorial(): Promise<string> {
  //   return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
  //     return value;
  //   });
  // };













}
