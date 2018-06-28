// import { OnboardingPage } from './../pages/onboarding/onboarding';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { ColDaysListPage } from '../pages/col-days-list/col-days-list';

import { TrMenuListPage } from '../pages/tr-menu-list/tr-menu-list'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TrMenuListPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

