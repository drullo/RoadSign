import { Component, AfterViewInit, ViewChild, ViewChildren, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { CarouselItemComponent } from './components/carousel-item/carousel-item.component';
import { Observable, Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('carousel') carousel: ElementRef;
  @ViewChildren(CarouselItemComponent) carouselItems: CarouselItemComponent[];
  refreshSubscription: Subscription;
  paused: boolean;
  displayMenu: boolean;
  closeMenuOnItemSelected: boolean = true;

  ngOnInit(): void {
    // Automatically refresh every hour (to re-read dynamic lists like SharePoint events, etc.)
    this.refreshSubscription = Observable.interval(3600000)
      .subscribe(o => window.location.href = window.location.href);
  }

  ngAfterViewInit(): void {
    // This is a work-around for bootstrap...
    // Bootstrap carousel requires all carousel-items to live directly inside of the carousel-inner DIV - they can't be further down inside of other elements.
    // And Angular doesn't provide a way to render a component without it's wrapper tag (<carousel-item> in this case).
    // So... I'm using jQuery to unwrap the carousel-item DIVs from their <carousel-item> tag - thus removing the tag and exposing the inner contents to the carousel.
    $('carousel-item').contents().unwrap();

    // Listen to the client-side 'slide' event of the Bootstrap Carousel.
    // This event gets called right before the carousel transitions to the next slide.
    // Every time the carousel returns to the beginning, call setNextItem() on components that randomize a list of display items.
    $(this.carousel.nativeElement).on('slide.bs.carousel', (e) => {
      if (e.to == 0)
        this.carouselItems.forEach(item => item.setNextItem());
    });
  }

  ngOnDestroy(): void {
    this.refreshSubscription.unsubscribe();
  }

  // If the data retreived by this component contains no items, then hide the component
  gotData(dataExists: boolean, type: string) {
    if (dataExists) return;
    
    this.carouselItems
      .filter(item => item.type == type)
      .forEach(item => item.visible = false);

    // Also hide the associated menu items for this component
    $('#menu-' + type).remove();
  }

  onCarouselClick(): void {
    this.paused = true;
    $(this.carousel.nativeElement).carousel('pause');
    this.displayMenu = true;
  }

  resume(): void {
    this.paused = false;
    $(this.carousel.nativeElement).carousel('cycle');
    this.displayMenu = false;
  }

  goToSlide(type: string) {
    let index: number = $('#' + type).index();
    $(this.carousel.nativeElement).carousel(index);   // Go to the selected carousel item
    $(this.carousel.nativeElement).carousel('pause'); // Re-pause the carousel

    if (this.closeMenuOnItemSelected)
      this.displayMenu = false;
  }

  getNextItem(type: string) {
    this.carouselItems
      .filter(item => item.type == type)
      .forEach(item => item.setNextItem());

    if (this.closeMenuOnItemSelected)
      this.displayMenu = false;
  }
}