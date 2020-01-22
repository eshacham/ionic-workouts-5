import { Component, OnInit } from '@angular/core';
import { ThemeServiceProvider, ITheme } from '../providers/theme-service/theme-service';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { Router } from '@angular/router';
import { Logger, LoggingService } from 'ionic-logging-service';
import { Store } from '@ngrx/store';
import { IAppState } from '../store/state/app.state';
import { getTheme } from '../store/selectors/data.selectors';
import { take } from 'rxjs/operators';
import { SetTheme } from '../store/actions/data.actions';

interface ISelectedTheme  {
  selected: boolean;
  theTheme: ITheme;
}

@Component({
  selector: 'app-tab-settings',
  templateUrl: 'tab-settings.page.html',
  styleUrls: ['tab-settings.page.scss']
})
export class TabSettingsPage implements OnInit {
  private logger: Logger;
  themes: ISelectedTheme[];
  selectedSegment = 'themes';

  constructor(
    loggingService: LoggingService,
    private themeService: ThemeServiceProvider,
    private store: Store<IAppState>,
    private router: Router,
    private dataServiceProvider: DataServiceProvider) {
      this.logger = loggingService.getLogger('App.TabSettingsPage');
      this.themes = this.themeService.themes.map(t => ({ selected: false, theTheme: t }));
      this.logger.entry('ctor', this.themes);
    }

    ngOnInit() {
      this.store.select(getTheme)
      .pipe(take(1))
      .subscribe((theme) => {
        this.logger.info('ngOnInit', 'getTheme', theme);
        if (theme) {
          this.themes.find(t => t.theTheme.name === theme).selected = true;
        }
      });
    }

   themeSelected(selectedtheme: string) {
    this.themes.forEach(t => t.selected = t.theTheme.name === selectedtheme);
    this.logger.debug('theme selected: ', selectedtheme);
    this.store.dispatch(new SetTheme(selectedtheme));
  }

  getSelectedThemeImage(i: number): string {
    const theme = this.themes.find(t => t.selected);
    if (theme) {
      return `${theme.theTheme.image}-${i}.png`;
    }
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
    this.logger.debug('segmentChanged', this.selectedSegment);
  }

  async resetData() {
    await this.dataServiceProvider.resetData();
    this.router.navigate(['']);
  }

}
