import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../../shared/dish';
import { DishService } from '../../services/dish.service';

import { Promotion } from '../../shared/promotion';
import { PromotionService } from '../../services/promotion.service';

import { Leader } from '../../shared/leader';
import { LeaderService } from '../../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  errDish: string;
  errPromo: string;
  errLeader: string;

  constructor(private dishService: DishService,
              private promotionService: PromotionService,
              private leaderService: LeaderService,
              @Inject('BaseURL') private BaseURL) {

    this.dishService.getFeaturedDish()
      .subscribe(dish => this.dish = dish,
                 errmsg => this.errDish = <any>errmsg);

    this.promotionService.getFeaturedPromotion()
      .subscribe(promo => this.promotion = promo,
                 errmsg => this.errPromo = <any>errmsg);

    this.leaderService.getFeaturedLeader()
      .subscribe(lead => this.leader = lead,
                 errmsg => this.errLeader = <any>errmsg);

  }

  ngOnInit() {
  }

}
