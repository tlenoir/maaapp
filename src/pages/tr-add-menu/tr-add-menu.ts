import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Success } from '../../providers/model/login';
import { ObsonatorProvider } from '../../providers/obsonator';

// import { Http, Response } from '@angular/http';


@Component({
  selector: 'page-tr-add-menu',
  templateUrl: 'tr-add-menu.html',
})
export class TrAddMenuPage {

  form: FormGroup;
  dataInicial: any;
  maxDate: string;
  createMenu = 'http://groupe2.api/api/meal/create';
  resultLogin: Success;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    platform: Platform,
    public formBuilder: FormBuilder,
    public obso: ObsonatorProvider,
    public loadingCtrl: LoadingController) {

    platform.ready().then(() => {

      this.form = this.formBuilder.group({
        title: ['', Validators.required]
        // ,
        // description: ['', Validators.required],
        // date: ['', Validators.required],
      });

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrAddMenuPage');
  }

  ionViewWillEnter() {
    this.resultLogin = this.navParams.get('exitumLogin')
  }

  logForm() {
    console.log(this.form.value)
    this.addPlat()
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

  addPlat() {
    this.obso.createMeals(this.resultLogin.token, this.form.value.title)
    this.loadingPlat();
    // this.navCtrl.push(TrAddMenuPage)
  }

  loadingPlat() {
    const loader = this.loadingCtrl.create({
      content: "Ajout en cours...",
      duration: 2000
    });
    loader.present();
  }

}
