import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';

@Injectable()
export class FeedbackService {

  constructor(private restangular: Restangular) { }

  getFeedback() {
    return this.restangular.all('feedback').getList();
  }

  testF(): void {
    console.log('ok ok , FeedbackService works');
  }

}
