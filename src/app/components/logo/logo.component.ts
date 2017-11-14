import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../services/images.service';

@Component({
  selector: 'logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {
  imageSource: string;

  constructor(private imageService: ImagesService) { }

  ngOnInit(): void {
    this.imageService.getLogo()
      .take(1)
      .subscribe(logos => {
        if (logos.length > 0)
          this.imageSource = logos[0].ows_EncodedAbsUrl;
      });
  }
}