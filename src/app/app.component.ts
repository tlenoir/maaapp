// import { OnboardingPage } from './../pages/onboarding/onboarding';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

<<<<<<< HEAD
// import { WelcomepagePage } from './../pages/welcomepage/welcomepage';
import { HomePage } from '../pages/home/home';
=======
import { LoginPage } from '../pages/login/login'

>>>>>>> 442a3d839ee86b79b82f9e15996ab49c59a738d3
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

