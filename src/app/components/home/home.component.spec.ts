import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BrowserAnimationBuilder } from '@angular/platform-browser/animations/src/animation_builder';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Leader } from '../../shared/leader';
import { LEADERS } from '../../shared/leaders';
import { LeaderService } from '../../services/leader.service';
import { Dish } from '../../shared/dish';
import { DISHES } from '../../shared/dishes';
import { DishService } from '../../services/dish.service';
import { Promotion } from '../../shared/promotion';
import { PROMOTIONS } from '../../shared/promotions';
import { PromotionService } from '../../services/promotion.service';
import { baseURL } from '../../shared/baseurl';
import { localURL } from '../../shared/baseurl';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const DishServiceStub = {
    getFeaturedDish: function(): Observable<Dish> {
      return Observable.of(DISHES[0]);
    }
  };

  const LeaderServiceStub = {
    getFeaturedLeader: function(): Observable<Leader> {
      return Observable.of(LEADERS[0]);
    }
  };

  const PromotionServiceStub = {
    getFeaturedPromotion: function(): Observable<Promotion> {
      return Observable.of(PROMOTIONS[0]);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [ BrowserAnimationsModule, FlexLayoutModule,
        RouterTestingModule.withRoutes([{ path: 'home', component: HomeComponent }]) ],
      providers: [
        {provide: LeaderService, useValue: LeaderServiceStub },
        {provide: DishService, useValue: DishServiceStub },
        {provide: PromotionService, useValue: PromotionServiceStub },
        {provide: 'BaseURL', useValue: baseURL },
        {provide: 'LocalURL', useValue: localURL }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    let leaderService = TestBed.get(LeaderService);
    let dishService = TestBed.get(DishService);
    let promotionService = TestBed.get(PromotionService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log(component);
    expect(component).toBeTruthy();
  });

  it('dish item to be correct', () => {
    expect(component.dish).toBeTruthy();
    expect(component.dish.id).toBe(0);
    expect(component.dish.category).toBe('mains');
  });

  it('leader item to be correct', () => {
    expect(component.leader).toBeTruthy();
    expect(component.leader.abbr).toBe('CEO');
    expect(component.leader.name).toBe('Peter Pan');
  });

  it('leader item to be correct', () => {
    expect(component.promotion).toBeTruthy();
    expect(component.promotion.label).toBe('New');
    expect(component.promotion.price).toEqual('19.99');
  });

});
