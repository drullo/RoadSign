//Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// PrimeNg
import {
  ButtonModule,
  CheckboxModule,
  DialogModule,
  OverlayPanelModule
} from 'primeng/primeng';

// Services
import { ImagesService } from './services/images.service';
import { CustomerVisitsService } from './services/customer-visits.service';
import { HolidaysService } from './services/holidays.service';
import { WeatherService } from './services/weather.service';
import { EmailService } from './services/email.service';

// Components
import { AppComponent } from './app.component';
import { DateTimeComponent } from './components/date-time/date-time.component';
import { LogoComponent } from './components/logo/logo.component';
import { RotatingImagesComponent } from './components/rotating-images/rotating-images.component';
import { CustomerVisitsComponent } from './components/customer-visits/customer-visits.component';
import { HolidaysComponent } from './components/holidays/holidays.component';
import { WeatherComponent } from './components/weather/weather.component';
import { CarouselItemComponent } from './components/carousel-item/carousel-item.component';

@NgModule({
  declarations: [
    AppComponent,
    DateTimeComponent,
    LogoComponent,
    RotatingImagesComponent,
    CustomerVisitsComponent,
    HolidaysComponent,
    WeatherComponent,
    CarouselItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    // PrimeNg
    ButtonModule,
    CheckboxModule,
    DialogModule,
    OverlayPanelModule
  ],
  providers: [
    ImagesService,
    CustomerVisitsService,
    HolidaysService,
    WeatherService,
    EmailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }