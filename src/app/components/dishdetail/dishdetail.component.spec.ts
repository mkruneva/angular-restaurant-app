import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationBuilder } from '@angular/platform-browser/animations/src/animation_builder';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';

import { Dish } from '../../shared/dish';
import { DISHES } from '../../shared/dishes';
import { Comment } from '../../shared/comment';
import { DishService } from '../../services/dish.service';
import { baseURL } from '../../shared/baseurl';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { DishdetailComponent } from './dishdetail.component';

describe('DishdetailComponent', () => {
  let component: DishdetailComponent;
  let fixture: ComponentFixture<DishdetailComponent>;

  let DishServiceMock = {
    getDishIds: function(): Observable<number[]> {
      return Observable.of(DISHES)
        .map(dishes => dishes.map(dish => dish.id));
    },
    getDish: function(): Observable<Dish> {
      return Observable.of(DISHES[1]);
    }
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishdetailComponent ],
      imports: [ BrowserAnimationsModule, MaterialModule, FlexLayoutModule,
        FormsModule, ReactiveFormsModule,
        RouterTestingModule.withRoutes([{ path: 'dishdetail', component: DishdetailComponent }]) ],
      providers: [ {provide: DishService, useValue: DishServiceMock }, {provide: 'BaseURL', useValue: baseURL }
      ]
    })
    .compileComponents();

    const dishService = TestBed.get(DishService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log(component);
    expect(component).toBeTruthy();
  });

  it('dishes dishIds to be correct', () => {
    expect(component.dishIds.length).toEqual(4);
  });
});
