import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
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
export class LeaderService {

  constructor(private http: Http, private procssHTTPservice: ProcessHttpmsgService) { }

  getLeaders(): Observable<Leader[]> {
      return this.http.get(baseURL + 'leaders')
          .map(res => this.procssHTTPservice.extractData(res))
          .catch(err => this.procssHTTPservice.handleError(err));
  }

  getFeaturedLeader(): Observable<Leader> {
      return this.http.get(baseURL + 'leaders?featured=true')
          .map(res => this.procssHTTPservice.extractData(res)[0])
          .catch(err => this.procssHTTPservice.handleError(err));
  }

}
