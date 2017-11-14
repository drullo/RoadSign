import { Component, OnInit, Output, EventEmitter } from '@angular/core';
//import { randomArrayElement } from 'random-array-element-ts';
import { CustomerVisit } from '../../models/customer-visit';
import { CustomerVisitsService } from '../../services/customer-visits.service';
import { Randomizer } from '../../utilities/randomizer';

import * as moment from 'moment';

@Component({
  selector: 'customer-visits',
  templateUrl: './customer-visits.component.html',
  styleUrls: ['./customer-visits.component.css']
})
export class CustomerVisitsComponent implements OnInit {
  @Output() gotData = new EventEmitter();
  private visits: CustomerVisit[] = [];
  visit: CustomerVisit;
  private logoURL: string;

  constructor(private visitsService: CustomerVisitsService) { }

  ngOnInit(): void {
    let today: moment.Moment = moment().startOf('day');

    this.visitsService.getVisits()
      .take(1)
      .subscribe(visits => {
        visits.forEach(visit => {
          if (visit.ows_EventDate && visit.ows_Logo) {
            // Make sure this visit is happening today
            let visitDay: moment.Moment = moment(visit.ows_EventDate).startOf('day');
            if (visitDay.isSame(today)) {
              this.visits.push(visit);
            }
          }
        });

        this.setNextItem();

        this.gotData.emit(this.visits.length > 0);
      });
  }

  setNextItem(): void {
    if (this.visits.length == 0)
      return;

    this.visit = Randomizer.getRandomElement(this.visits, this.visit); // randomArrayElement(this.visits);
    this.getLogo();
  }

  // Sometimes SharePoint URL fields will contain a single value.  And sometimes it will be two values separated by a comma (Description is the 2nd one)
  private getLogo(): void {
    if (!this.visit || !this.visit.ows_Logo)
      return null;

    this.logoURL = this.visit.ows_Logo.split(',')[0];
  }
}