import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Promise } from 'q';
// import { resolve } from 'path';

@Injectable()
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]> {
    return Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(DISHES), 2000);
    });
  }

  getDish(id: number): Promise<Dish> {
    return Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
    });
  }

  getFeaturedDish(): Promise<Dish> {
    return  Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    });
  }

}
