import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharePointList } from '../models/share-point-list';
import { CustomerVisit } from '../models/customer-visit';

@Injectable()
export class CustomerVisitsService {
  private url = 'http://webservices.price.local/api/sharepoint';

  constructor(private http: HttpClient) { }

  getVisits(): Observable<CustomerVisit[]> {
    let spList: SharePointList = {
      list: 'Customer Visits',
      view: 'Current Events'
    }
    return this.http.post<CustomerVisit[]>(this.url, spList);
  }
}