import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChooseExerciseActionPopoverComponent } from './choose-exercise-action-popover.component';

describe('ChooseExerciseActionPopoverComponent', () => {
  let component: ChooseExerciseActionPopoverComponent;
  let fixture: ComponentFixture<ChooseExerciseActionPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseExerciseActionPopoverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChooseExerciseActionPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
