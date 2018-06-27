import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

// import { Http, Response } from '@angular/http';


@Component({
  selector: 'page-tr-add-menu',
  templateUrl: 'tr-add-menu.html',
})
export class TrAddMenuPage {

  private form: FormGroup;
  dataInicial: any;
  maxDate: string;
  createMenu = 'http://groupe2.api/api/meal/create';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    platform: Platform,
    public formBuilder: FormBuilder) {

    platform.ready().then(() => {

      this.form = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        date: ['', Validators.required],
      });

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrAddMenuPage');
  }

  logForm() {
    console.log(this.form.value)
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

}
