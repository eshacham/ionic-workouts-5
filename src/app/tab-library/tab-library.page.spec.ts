import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabLibraryPage } from './tab-library.page';

describe('TabLibraryPage', () => {
  let component: TabLibraryPage;
  let fixture: ComponentFixture<TabLibraryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabLibraryPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabLibraryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
