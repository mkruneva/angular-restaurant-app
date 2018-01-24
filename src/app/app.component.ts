import { Component } from '@angular/core';
import { routeChange } from './animations/app.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    routeChange()
  ]
})
export class AppComponent {
  getPage(outlet) {
    return outlet.activatedRouteData['page'] || 'home';
  }
}
