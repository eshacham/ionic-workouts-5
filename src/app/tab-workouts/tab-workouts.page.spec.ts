import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabWorkoutsPage } from './tab-workouts.page';

describe('TabWorkoutsPage', () => {
  let component: TabWorkoutsPage;
  let fixture: ComponentFixture<TabWorkoutsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabWorkoutsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabWorkoutsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
