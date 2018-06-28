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

  urlMyMeals = 'http://groupe2.api/api/traiteur/myMeals';
  urlCreate = 'http://groupe2.api/api/meal/create';

  creator: createMeal;

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
      this.http.post(this.urlCreate, this.creator, {
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

  updateMeals(token: string, name: string) {

    let HeaderConfig = {'Authorization': 'Bearer '+token, 'Content-Type': 'application/x-www-form-urlencoded'}

    return new Promise(resolve => {
      this.http.post(this.urlCreate, this.creator, {
        headers: HeaderConfig,
        params: new HttpParams().set('name', name)
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.log(err);
        });
    })
  }

}
