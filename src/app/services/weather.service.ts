import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherService {
  private key = 'd468436d79156d41';
  private city = 'Irwin';
  private state = 'PA';
  private url = `http://api.wunderground.com/api/${this.key}/conditions/q/${this.state}/${this.city}.json`;

  constructor(private http: HttpClient) { }

  getCurrentWeather(): Observable<any> {
    return this.http.get(this.url);
  }
}