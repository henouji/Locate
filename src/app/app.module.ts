import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Geolocation
import { Geolocation } from '@ionic-native/geolocation/ngx';

// Geocoder
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

// Modal
import { StationPageModule } from './station/station.module';
// import { StationPage } from './station/station.page';
// import { SettingsPageModule } from './settings/settings.module';
// import { SettingsPage } from './settings/settings.page';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,StationPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    NativeGeocoder,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
