import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { SelectMusclePage } from './select-muscle.page';

describe('SelectMusclePage', () => {
  let component: SelectMusclePage;
  let fixture: ComponentFixture<SelectMusclePage>;

  let storeSpy;
  let routeSpy, routerSpy, routeSubscribeSpy, routeUnsubscribeSpy;

  beforeEach(async(() => {
    routeSubscribeSpy = jasmine.createSpyObj('Observable', ['subscribe']);
    routeUnsubscribeSpy = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    routeSpy = jasmine.createSpyObj('ActivatedRoute', [], { queryParams: routeSubscribeSpy});
    // routerSpy = jasmine.createSpyObj()
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select'])

    TestBed.configureTestingModule({
      declarations: [ SelectMusclePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: routeSpy },
        { provide: Router, useValue: routerSpy },
        { provide: Store, useValue: storeSpy },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMusclePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
