import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { baseURL} from '../shared/baseurl';
import { Http, Response } from '@angular/http';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class DishService {

  constructor(private http: Http, private procssHTTPservice: ProcessHttpmsgService) { }

  // using rxjs
  getDishes() {
    return this.http.get(baseURL + 'dishes')
             .map(res => this.procssHTTPservice.extractData(res));
  }

  getDish(id: number): Observable<Dish> {
    return  this.http.get(baseURL + 'dishes/' + id)
                    .map(res => this.procssHTTPservice.extractData(res));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get(baseURL + 'dishes?featured=true')
                    .map(res => this.procssHTTPservice.extractData(res)[0]);
  }

  getDishIds(): Observable<number[]> {
    return this.getDishes()
      .map(dishes => dishes.map(dish => dish.id));
  }

}
