import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharePointList } from "../models/share-point-list";
import { SharePointPicture } from '../models/share-point-picture';

@Injectable()
export class ImagesService {
  private url = 'http://webservices.price.local/api/sharepoint';
  private site = 'http://cpsp1/DigitalDisplay';
  private view = 'All Pictures';

  constructor(private http: HttpClient) { }

  getLogo(): Observable<SharePointPicture[]> {
    let spList: SharePointList = {
      list: 'CP Logo',
      view: this.view,
      site: this.site
    };

    return this.http.post<SharePointPicture[]>(this.url, spList);
  }

  getRotatingImages(): Observable<SharePointPicture[]> {
    let spList: SharePointList = {
      list: 'Rotating Images',
      view: this.view,
      site: this.site
    };

    return this.http.post<SharePointPicture[]>(this.url, spList);
  }

  getWeatherIcons(): Observable<SharePointPicture[]> {
    let spList: SharePointList = {
      list: 'Weather Icons',
      view: this.view,
      site: this.site
    };

    return this.http.post<SharePointPicture[]>(this.url, spList);
  }
}