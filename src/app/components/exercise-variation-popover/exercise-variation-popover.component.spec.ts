import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseVariationPopoverComponent } from './exercise-variation-popover.component';
import { NavParams } from '@ionic/angular';
import { MockNavParams } from 'src/app/test-config/mocks-ionic';

describe('ExerciseVariationPopoverPage', () => {
  let component: ExerciseVariationPopoverComponent;
  let fixture: ComponentFixture<ExerciseVariationPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseVariationPopoverComponent ],
      providers: [
        { provide: NavParams, useClass: MockNavParams }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseVariationPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
