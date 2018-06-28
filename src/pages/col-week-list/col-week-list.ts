import { ContributorProvider } from './../../providers/contributor';
import { menuGetObject, Datum, Meal } from './../../providers/model/menuGet';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Success } from './../../providers/model/login';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the ColWeekListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import * as moment from 'moment';
@Component({
  selector: 'page-col-week-list',
  templateUrl: 'col-week-list.html',
})
export class ColWeekListPage {

  form: FormGroup;
  dataInicial: any;
  maxDate: string;

  resultLogin: Success;



  date: string;
  nextDay: string;
  datar;
  mealById: Datum[];
  templateMealId;
  templateMeal;
  ngForThis;


  isTheResult: menuGetObject;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private contr: ContributorProvider) {

    this.form = this.formBuilder.group({
      date: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ColWeekListPage');
  }

  ionViewWillEnter() {

    this.resultLogin = this.navParams.get('exitumLogin');
    console.log('email', this.resultLogin.email)

    this.launchDaysPage()

  }

  logForm() {
    console.log('valloue', this.form.value.date)
  }

  @ViewChild('datePicker') datePicker;
  open() {
    if (!this.dataInicial) {
      this.dataInicial = new Date().toJSON().split('T')[0];
      setTimeout(() => {
        this.datePicker.open();
      }, 50)
    } else {
      this.datePicker.open();
    }
  }


  launchDaysPage() {

    this.date = moment(this.form.value.date).format('DD-MM-YYYY')
    console.log('formDate', this.form.value.date)
    console.log('date', this.date)

    this.nextDay = moment().day(1).format('DD-MM-YYYY')

    console.log('nextDayIs', this.nextDay)
    this.getMenu(this.resultLogin.token, this.nextDay)


  }

  getMenu(token, datee) {

    this.ngForThis = new Promise<Meal[]>(resolve => {
      this.contr.getMenuByDate(token, datee)
        .then((data: menuGetObject) => {

          this.mealById = data.data

          this.mealById
            .map(res => {
              return resolve(res.meal)
            })
        })
        .catch(err => {
          console.log(err)
        })
    })
  }
}
