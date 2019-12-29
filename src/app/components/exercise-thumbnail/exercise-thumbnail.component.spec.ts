import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverController } from '@ionic/angular';

import { ExerciseThumbnailComponent } from './exercise-thumbnail.component';
import { PopoverControllerMock } from 'src/app/test-config/mocks-ionic';

describe('ExerciseThumbnailPage', () => {
  let component: ExerciseThumbnailComponent;
  let fixture: ComponentFixture<ExerciseThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseThumbnailComponent],
      providers: [
        { provide: PopoverController, useClass: PopoverControllerMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
