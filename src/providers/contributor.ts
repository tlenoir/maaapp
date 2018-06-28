import { menuGetObject } from './model/menuGet';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ContributorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContributorProvider {

  urlMenuGet = 'http://groupe2.api/api/menuFrom/';
  urlCreateOrder = 'http://groupe2.api/api/order/create';
  urlDeleteOrder = 'http://groupe2.api/api/menu/';
  urlGetOrder = 'http://groupe2.api/api/order/';

  creatorOrder: menuGetObject;

  constructor(public http: HttpClient) {
    console.log('Hello ContributorProvider Provider');
  }

  getMenuByDate(token: string, date: string){

    return new Promise(resolve => {
      this.http.get(this.urlMenuGet, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });

  }

  createOrder(token: string, idmenu) {

    return new Promise(resolve => {
      this.http.post(this.urlCreateOrder, this.creatorOrder, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
        params: new HttpParams().set('menu_id', idmenu)
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.log(err);
        });
    })
  }

  deleteOrder(token: string, idmenu: number) {

    return new Promise(resolve => {
      this.http.delete(this.urlDeleteOrder+idmenu, {
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

  getOrder(token: string, idOrder: number) {

    return new Promise(resolve => {
      this.http.get(this.urlGetOrder+idOrder, {
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
