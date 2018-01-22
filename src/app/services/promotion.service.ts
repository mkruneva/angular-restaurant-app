import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { baseURL} from '../shared/baseurl';
import { Http, Response } from '@angular/http';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { PROMOTIONS } from '../shared/promotions'; // remove
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class PromotionService {

  constructor(private http: Http, private procssHTTPservice: ProcessHttpmsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get(baseURL + 'promotions')
             .map(res => this.procssHTTPservice.extractData(res));
  }

  getPromotion(id: number): Observable<Promotion> {
    return  this.http.get(baseURL + 'promotions/' + id)
                    .map(res => this.procssHTTPservice.extractData(res));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get(baseURL + 'promotions?featured=true')
                    .map(res => this.procssHTTPservice.extractData(res)[0]);
  }

}
