import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMusclePage } from './select-muscle.page';

describe('SelectMusclePage', () => {
  let component: SelectMusclePage;
  let fixture: ComponentFixture<SelectMusclePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMusclePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
