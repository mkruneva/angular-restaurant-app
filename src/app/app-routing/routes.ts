import { Routes } from '@angular/router';

import { MenuComponent } from '../components/menu/menu.component';
import { DishdetailComponent } from '../components/dishdetail/dishdetail.component';
import { HomeComponent } from '../components/home/home.component';
import { AboutComponent } from '../components/about/about.component';
import { ContactComponent } from '../components/contact/contact.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { page: 'home' } },
  { path: 'about', component: AboutComponent, data: { page: 'about' } },
  { path: 'contact', component: ContactComponent, data: { page: 'contact' } },
  { path: 'menu', component: MenuComponent, data: { page: 'menu' } },
  { path: 'dishdetail/:id', component: DishdetailComponent, data: { page: 'dishdetail' } },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
