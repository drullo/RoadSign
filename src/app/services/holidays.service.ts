import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Holiday } from '../models/holiday';
import { SharePointList } from "../models/share-point-list";

@Injectable()
export class HolidaysService {
  private url = 'http://webservices.price.local/api/sharepoint';
  
  constructor(private http: HttpClient) { }

  getHolidays(): Observable<Holiday[]> {
    let spList: SharePointList = {
      list: 'Company Events',
      view: 'Current Events'
    };
    
    return this.http.post<Holiday[]>(this.url, spList);
  }
}