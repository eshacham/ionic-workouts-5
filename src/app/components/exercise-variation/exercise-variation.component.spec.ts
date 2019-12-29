import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverController } from '@ionic/angular';

import { ExerciseVariationComponent } from './exercise-variation.component';
import { PopoverControllerMock } from 'src/app/test-config/mocks-ionic';
import { defaultFirstWorkout } from '../../test-config/mocks-ionic';

describe('ExerciseVariationPage', () => {
  let component: ExerciseVariationComponent;
  let fixture: ComponentFixture<ExerciseVariationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseVariationComponent ],
      providers: [
        { provide: PopoverController, useClass: PopoverControllerMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseVariationComponent);
    component = fixture.componentInstance;
    component.exercise = defaultFirstWorkout.days[0].exerciseSets[0].exercises[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



});
