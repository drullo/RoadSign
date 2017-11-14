import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ImagesService } from "../../services/images.service";
//import { randomArrayElement } from 'random-array-element-ts';
import { Randomizer } from '../../utilities/randomizer';

@Component({
  selector: 'rotating-images',
  templateUrl: './rotating-images.component.html',
  styleUrls: ['./rotating-images.component.css']
})
export class RotatingImagesComponent implements OnInit {
  @Output() gotData = new EventEmitter();
  private images: string[] = [];
  imageSource: string;

  constructor(private imageService: ImagesService) { }

  ngOnInit(): void {
    this.imageService.getRotatingImages()
      .take(1)
      .subscribe(logos => {
        logos.forEach(logo => this.images.push(logo.ows_EncodedAbsUrl));

        this.setNextItem();

        this.gotData.emit(this.images.length > 0);
      });
  }

  setNextItem(): void {
    if (this.images.length == 0)
      return;

    this.imageSource = Randomizer.getRandomElement(this.images, this.imageSource); //randomArrayElement(this.images);
  }
}