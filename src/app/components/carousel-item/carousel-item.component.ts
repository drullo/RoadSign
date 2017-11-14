import { Component, OnInit, Input, AfterContentInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { RotatingImagesComponent } from '../rotating-images/rotating-images.component';
import { CustomerVisitsComponent } from '../customer-visits/customer-visits.component';
import { HolidaysComponent } from '../holidays/holidays.component';

@Component({
  selector: 'carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.css']
})
export class CarouselItemComponent implements OnInit {
  @Input() isFirst: boolean;
  @Input() type: string;
  @Output() gotData = new EventEmitter();
  @ViewChild(CustomerVisitsComponent) visits: CustomerVisitsComponent;
  @ViewChild(RotatingImagesComponent) rotatingImages: RotatingImagesComponent;
  @ViewChild(HolidaysComponent) holidays: HolidaysComponent;
  visible: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  gotDataInternal($event) {
    this.gotData.emit($event);
  }

  setNextItem(): void {
    if (this.visits)
      this.visits.setNextItem();
    if (this.rotatingImages)
      this.rotatingImages.setNextItem();
    if (this.holidays)
      this.holidays.setNextItem();
  }
}