import { WelcomepagePage } from './../pages/welcomepage/welcomepage';
import { TrMenuListPage } from './../pages/tr-menu-list/tr-menu-list';
import { TrAddMenuPage } from './../pages/tr-add-menu/tr-add-menu';
import { OnboardingPage } from './../pages/onboarding/onboarding';
import { LoginPage } from './../pages/login/login';
import { ColWeekListPage } from './../pages/col-week-list/col-week-list';
import { ColDaysListPage } from './../pages/col-days-list/col-days-list';
import { ChoiceUserPage } from './../pages/choice-user/choice-user';


import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, ToastController, DateTime } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SQLite } from '@ionic-native/sqlite';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChoiceUserPage,
    ColDaysListPage,
    ColWeekListPage,
    LoginPage,
    OnboardingPage,
    TrAddMenuPage,
    TrMenuListPage,
    WelcomepagePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChoiceUserPage,
    ColDaysListPage,
    ColWeekListPage,
    LoginPage,
    OnboardingPage,
    TrAddMenuPage,
    TrMenuListPage,
    WelcomepagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ToastController,
    DateTime,
    SQLite,
    Camera
  ]
})
export class AppModule {}
