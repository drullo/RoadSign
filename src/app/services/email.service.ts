import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Email } from '../models/email';
import { WeatherCondition } from '../models/weather-condition';

@Injectable()
export class EmailService {
  private url = 'http://webservices.price.local/api/email';

  constructor(private http: HttpClient) { }

  missingIcon(weather: string): Observable<any> {
    let email: Email = {
      server: 'cpes1.price.local',
      smtpPort: 2525,
      subject: `Roadsign - No image matching '${weather}' weather`,
      sender: {
        emailAddress: 'itprocess@cleavelandprice.com',
        userName: 'itprocess',
        password: 'itproce$$'
      },
      recipients: {
        to: [ 'drullo@cleavelandprice.com' ]
      },
      content: {
        html: `<html><body><h3>No image was found on SharePoint that matches the current weather!</h3><p>This means that the road sign is currently not displaying an image. To fix it, add an image named '${weather}' to the Weather Icons library on SharePoint and refresh the page.</p></body></html>`
      }
    };

    return this.http.post(this.url, email);
  }
}