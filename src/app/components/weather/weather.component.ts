import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { WeatherCondition } from '../../models/weather-condition';
import { WeatherService } from '../../services/weather.service';
import { ImagesService } from "../../services/images.service";
import { EmailService } from '../../services/email.service';
import { SharePointPicture } from '../../models/share-point-picture';

import * as moment from 'moment';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {
  @Output() gotData = new EventEmitter();
  private icons: SharePointPicture[];
  private icon: string;
  weatherCondition: WeatherCondition;
  private refreshSubscription: Subscription;

  constructor(private imagesServices: ImagesService, private weatherService: WeatherService, private emailService: EmailService) { }

  ngOnInit(): void {
    this.imagesServices.getWeatherIcons()
      .take(1)
      .subscribe(data => {
        this.icons = data;
        this.getIcon(); // getIcon is called twice because we don't know if getWeatherIcons or getCurrentWeather will finish first.  So whichever one finishes last, will cause the icon to be set because both must be complete.
      });

    this.refreshSubscription = Observable.timer(0, 900000)
      .subscribe(t => {
        this.getWeather();
      });
  }

  ngOnDestroy(): void {
    this.refreshSubscription.unsubscribe();
  }

  private getIcon(): void {
    if (!this.weatherCondition || !this.icons || this.icons.length == 0)
      return;

    let url: string;
    let title: string;

    this.icons
      .filter(i => i.ows_Title && i.ows_Title.toLowerCase() == this.weatherCondition.weather.toLowerCase())
      .forEach(i => {
        url = i.ows_EncodedAbsUrl;
        title = i.ows_Title;
      });

    // Special case for 'Clear' weather.  During nightime hours, show a moon instead of a sun.
    if (title.toLowerCase() == 'clear') {
      let now = moment();

      // Between 7pm and 7am
      if (now.hours() < 7 || now.hours() > 19) {
        this.icons
          .filter(i => i.ows_Title && i.ows_Title.toLowerCase() == 'moon')
          .forEach(i => {
            url = i.ows_EncodedAbsUrl;
          });
      }
    }

    this.icon = url;

    // If we failed to match an icon, send an email to get it fixed...
    if (!this.icon) {
      this.emailService.missingIcon(this.weatherCondition.weather)
        .take(1)
        .subscribe(data => { });
    }
  }

  private getWeather(): void {
    this.weatherCondition = null;
    this.icon = null;

    this.weatherService.getCurrentWeather()
      .take(1)
      .subscribe(data => {
        this.weatherCondition = data.current_observation;
        this.getIcon(); // getIcon is called twice because we don't know if getWeatherIcons or getCurrentWeather will finish first.  So whichever one finishes last, will cause the icon to be set because both must be complete.

        this.gotData.emit(this.weatherCondition && this.weatherCondition.temp_f != null);
      });
  }
}