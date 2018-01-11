import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Promise } from 'q';
// import { resolve } from 'path';

@Injectable()
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Leader[]> {
      return Promise(resolve => {
        setTimeout(() => resolve(LEADERS), 2000);
      });
  }

  getFeaturedLeader(): Promise<Leader> {
      return  Promise(resolve => {
        // Simulate server latency with 2 second delay
        setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000);
      });
  }

}
