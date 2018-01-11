import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Promise } from 'q';
// import { resolve } from 'path';

@Injectable()
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Promotion[]> {
    return Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(PROMOTIONS), 2000);
    });
  }

  getPromotion(id: number): Promise<Promotion> {
    return Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]), 2000);
    });
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return  Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(PROMOTIONS.filter((promo) => promo.featured)[0]), 2000);
    });
  }

}
