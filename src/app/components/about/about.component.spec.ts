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
import { baseURL } from '../../shared/baseurl';
import { localURL } from '../../shared/baseurl';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  const LeaderServiceStub = {
    getLeaders: function(): Observable<Leader[]> {
      return Observable.of(LEADERS);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutComponent ],
      imports: [ BrowserAnimationsModule, FlexLayoutModule,
        RouterTestingModule.withRoutes([{ path: 'about', component: AboutComponent }]) ],
      providers: [
        {provide: LeaderService, useValue: LeaderServiceStub },
        {provide: 'BaseURL', useValue: baseURL },
        {provide: 'LocalURL', useValue: localURL }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    let leaderService = TestBed.get(LeaderService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // console.log(component);
    expect(component).toBeTruthy();
  });

  it('leaders items to be correct', () => {
    expect(component.leaders[0].abbr).toBe('CEO');
    expect(component.leaders[3].name).toBe('Alberto Somayya');
    expect(component.leaders[4]).toBeFalsy();
  });

  it('should use leaders in the template', () => {
    fixture.detectChanges();

    let de:      DebugElement;
    let el:      HTMLElement;
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;

    expect(el.textContent).toContain(LEADERS[0].name);
    expect(el.textContent).toContain(LEADERS[0].abbr);

  });

});
