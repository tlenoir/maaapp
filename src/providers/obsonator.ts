import { menuObject } from './model/menuCreate';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createMeal } from './model/myMeals';

/*
  Generated class for the ObsonatorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ObsonatorProvider {

  // http://groupe2.motjo.io/api/

  urlMyMeals = 'http://groupe2.api/api/traiteur/myMeals';
  urlCreateMeal = 'http://groupe2.api/api/meal/create';
  urlDeleteMeal = 'http://groupe2.api/api/meal/';
  urlUpdateMeal = 'http://groupe2.api/api/meal';
  urlMenu = 'http://groupe2.api/api/menu/create';
  urlUpdateMenu = 'http://groupe2.api/api/menu';
  urlDeleteMenu = 'http://groupe2.api/api/menu/';

  creatorMeal: createMeal;
  creatorMenu: menuObject;


  constructor(public http: HttpClient) {
    console.log('Hello ObsonatorProvider Provider');


  }




  getMyMeals(token: string) {

    return new Promise(resolve => {
      this.http.get(this.urlMyMeals, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });


  }

  createMeals(token: string, name: string) {

    return new Promise(resolve => {
      this.http.post(this.urlCreateMeal, this.creatorMeal, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
        params: new HttpParams().set('name', name)
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.log(err);
        });
    })
  }

  updateMeals(token: string, name: string, id) {

    let HeaderConfig = {'Authorization': 'Bearer '+token, 'Content-Type': 'application/x-www-form-urlencoded'}
    let ParamsConfig = {'name': name, 'meal_id': id}

    return new Promise(resolve => {
      this.http.put(this.urlUpdateMeal, this.creatorMeal, {
        headers: HeaderConfig,
        params: ParamsConfig
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.log(err);
        });
    })
  }

  deleteMeals(token: string, id: number) {

    return new Promise(resolve => {
      this.http.delete(this.urlDeleteMeal+id, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
      })
        .subscribe(res => {
          console.log('delete',res)
          resolve(res);
        }, (err) => {
          console.log(err);
        });
    })
  }

  createMenu(token: string, id, date: string) {

    let ParamsConfig = {'meal_id': id, 'date': date}

    return new Promise(resolve => {
      this.http.post(this.urlMenu, this.creatorMenu, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
        params: ParamsConfig
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.log(err);
        });
    })
  }

  updateMenu(token: string, idmenu, idmeal, date: string) {

    let HeaderConfig = {'Authorization': 'Bearer '+token, 'Content-Type': 'application/x-www-form-urlencoded'}
    let ParamsConfig = {'menu_id': idmenu, 'meal_id': idmeal, 'date': date}

    return new Promise(resolve => {
      this.http.put(this.urlUpdateMenu, this.creatorMeal, {
        headers: HeaderConfig,
        params: ParamsConfig
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.log(err);
        });
    })
  }

  deleteMenu(token: string, idmenu: number) {

    return new Promise(resolve => {
      this.http.delete(this.urlDeleteMenu+idmenu, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
      })
        .subscribe(res => {
          console.log('delete',res)
          resolve(res);
        }, (err) => {
          console.log(err);
        });
    })
  }

}
