import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { WorkoutDayComponent } from './workout-day.component';
import { defaultFirstWorkout } from 'src/app/test-config/mocks-ionic';

describe('WorkoutDayPage', () => {
  let component: WorkoutDayComponent;
  let fixture: ComponentFixture<WorkoutDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutDayComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutDayComponent);
    component = fixture.componentInstance;
    component.inWorkoutDaysPublisher = new Subject();
    component.workoutDay = defaultFirstWorkout.days[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
