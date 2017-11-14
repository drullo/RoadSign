import { Component, OnInit, OnDestroy } from '@angular/core';

import * as moment from 'moment';

import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.css']
})
export class DateTimeComponent implements OnInit, OnDestroy {
  hourminute: string;
  ampm: string;
  date: string;
  private subscription: Subscription;
  
  ngOnInit(): void {
    this.subscription = Observable.interval(1000)
      .subscribe(t => {
        this.hourminute = moment().format('h:mm');
        this.ampm = moment().format('a');
        this.date = moment().format('dddd, MMM. Do YYYY');
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}