import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseThumbnailPopoverComponent } from './exercise-thumbnail-popover.component';
import { NavParams } from '@ionic/angular';
import { MockNavParams } from 'src/app/test-config/mocks-ionic';

describe('ExerciseThumbnailPopoverPage', () => {
  let component: ExerciseThumbnailPopoverComponent;
  let fixture: ComponentFixture<ExerciseThumbnailPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseThumbnailPopoverComponent ],
      providers: [
        { provide: NavParams, useClass: MockNavParams }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseThumbnailPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
