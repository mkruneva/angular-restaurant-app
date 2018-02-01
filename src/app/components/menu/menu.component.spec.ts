import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BrowserAnimationBuilder } from '@angular/platform-browser/animations/src/animation_builder';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Dish } from '../../shared/dish';
import { DISHES } from '../../shared/dishes';
import { DishService } from '../../services/dish.service';
import { baseURL } from '../../shared/baseurl';
import { localURL } from '../../shared/baseurl';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { MenuComponent } from './menu.component';


describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  let DishServiceStub = {
    getDishes: function(): Observable<Dish[]> {
      return Observable.of(DISHES);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      imports: [ BrowserAnimationsModule, FlexLayoutModule,
                 RouterTestingModule.withRoutes([{ path: 'menu', component: MenuComponent }]) ],
      providers: [
         {provide: DishService, useValue: DishServiceStub },
         {provide: 'BaseURL', useValue: baseURL },
         {provide: 'LocalURL', useValue: localURL }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    let dishService = TestBed.get(DishService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dishes items to be correct', () => {
    expect(component.dishes.length).toEqual(4);
    expect(component.dishes[0].name).toBe('Uthappizza');
    expect(component.dishes[3].comments).toBeTruthy();
  });

  it('should use dishes in the template', () => {
    fixture.detectChanges();

    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;

    expect(el.textContent).toContain(DISHES[0].name.toUpperCase());

  });

});
