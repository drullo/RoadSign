import { Component, OnInit, Output, EventEmitter } from '@angular/core';
//import { randomArrayElement } from 'random-array-element-ts';
import { Holiday } from '../../models/holiday';
import { HolidaysService } from '../../services/holidays.service';
import { Randomizer } from '../../utilities/randomizer';

import * as moment from 'moment';

@Component({
  selector: 'holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {
  private occurringWithinDays = 1; // By default, we'll show holidiays occurring within 1 day (today or tomorrow)
  @Output() gotData = new EventEmitter();
  private holidays: Holiday[] = [];
  holiday: Holiday;
  imageUrl: string;

  constructor(private holidayService: HolidaysService) { }

  ngOnInit(): void {
    let today: moment.Moment = moment().startOf('day');
    
    this.holidayService.getHolidays()
      .take(1)
      .subscribe(holidays => {
        holidays.forEach(holiday => {
          let holidayStart = moment(holiday.ows_EventDate).startOf('day');
          let holidayEnd = moment(holiday.ows_EndDate).endOf('day');
          let leadTimeDays = holiday.ows_DisplayDaysWithin ?
            -(holiday.ows_DisplayDaysWithin) :
            -(this.occurringWithinDays);
          
          // Adjust the holiday start based on the specified lead time
          holidayStart = holidayStart.add(leadTimeDays, 'days');

          if (holiday.ows_ImageURLs &&
            today.isSameOrAfter(holidayStart) &&
            today.isSameOrBefore(holidayEnd)) {
              this.holidays.push(holiday);
            }
        });

        this.setNextItem();

        this.gotData.emit(this.holidays.length > 0);
      },
      err => this.gotData.emit(false));
  }

  setNextItem(): void {
    if (this.holidays.length == 0)
      return;

    this.holiday = Randomizer.getRandomElement(this.holidays, this.holiday); // randomArrayElement(this.holidays);
    let images: string[] = this.holiday.ows_ImageURLs.split('\n');
    this.imageUrl = Randomizer.getRandomElement(images); //randomArrayElement(images);
  }
}