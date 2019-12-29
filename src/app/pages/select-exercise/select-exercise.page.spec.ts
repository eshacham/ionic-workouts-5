import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectExercisePage } from './select-exercise.page';

describe('SelectExercisePage', () => {
  let component: SelectExercisePage;
  let fixture: ComponentFixture<SelectExercisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectExercisePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectExercisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
