import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dish } from '../../shared/dish';
import { DISHES } from '../../shared/dishes';
import { DishService } from '../../services/dish.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { MenuComponent } from './menu.component';

fdescribe('TodosComponent', () => {
    let service: DishService;
    let component: MenuComponent;

    beforeEach(() => {
        service = new DishService(null);
        component = new MenuComponent(service, null, null);
    });

    it('should set dishes property with the items returned from the server', () => {
        spyOn(service, 'getDishes').and.callFake(() => Observable.from([[1, 2, 3]]));

        component.ngOnInit();

        expect(component.dishes.length).toBeGreaterThan(0);
        expect(component.dishes.length).toBe(3);
    });
});
