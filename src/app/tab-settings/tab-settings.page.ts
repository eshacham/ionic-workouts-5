import { Component } from '@angular/core';
import { ThemeServiceProvider } from '../providers/theme-service/theme-service';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { Router } from '@angular/router';
import { Logger, LoggingService } from 'ionic-logging-service';

interface Theme  {
  name: string;
  selected: boolean;
  image: string;
}

@Component({
  selector: 'app-tab-settings',
  templateUrl: 'tab-settings.page.html',
  styleUrls: ['tab-settings.page.scss']
})
export class TabSettingsPage {
  private logger: Logger;

  constructor(
    loggingService: LoggingService,
    private themeService: ThemeServiceProvider,
    private router: Router,
    private dataServiceProvider: DataServiceProvider) {
      this.logger = loggingService.getLogger('App.TabSettingsPage');
    }

  selectedSegment = 'themes';

  themes: Theme[] = [
    { name: 'pink-skin', selected: false, image: '/assets/images/themes/pink-skin' },
    { name: 'red-blue-brown', selected: false, image: '/assets/images/themes/red-blue-brown' },
    { name: 'gray-yellow-green', selected: false, image: '/assets/images/themes/gray-yellow-green' },
    { name: 'mustard-red-cream', selected: false, image: '/assets/images/themes/mustard-red-cream' },
    { name: 'green-haki-bordo', selected: false, image: '/assets/images/themes/green-haki-bordo' },
    { name: 'gray-orange-black', selected: true, image: '/assets/images/themes/gray-orange-black' },
  ];

  themeSelected(event: any) {
    const selectedtheme = event.detail.value;
    this.logger.debug('theme seledted: ', selectedtheme);
    for (const theme of this.themes) {
      if (theme.name !== selectedtheme) {
        this.themeService.removeBodyClass(theme.name);
        theme.selected = false;
      } else {
        this.themeService.addBodyClass(theme.name);
        theme.selected = true;
      }
    }
  }

  getSelectedThemeImage(i: number): string {
    return `${this.themes.filter(t => t.selected)[0].image}-${i}.png`;
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
