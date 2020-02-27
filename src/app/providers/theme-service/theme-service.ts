import { Injectable, RendererFactory2, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export enum Themes {
  Orange = 'orange-theme',
  Pink = 'pink-theme',
  Red = 'red-theme',
  Green = 'green-theme',
  Blue = 'blue-theme',
  Yellow = 'yellow-theme'
}
export interface ITheme {
  name: Themes;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeServiceProvider {

  public static defaultTheme: Themes = Themes.Orange;
  renderer: Renderer2;

  themes: ITheme[] = [
    { name: Themes.Orange, image: '/assets/images/themes/orange-theme' },
    { name: Themes.Pink, image: '/assets/images/themes/pink-theme' },
    { name: Themes.Red, image: '/assets/images/themes/red-theme' },
    { name: Themes.Green, image: '/assets/images/themes/green-theme' },
    { name: Themes.Blue, image: '/assets/images/themes/blue-theme' },
    { name: Themes.Yellow, image: '/assets/images/themes/yellow-theme' },
  ];

  constructor(@Inject(DOCUMENT) private document: Document, rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  private addBodyClass(bodyClass: string) {
    this.renderer.addClass(this.document.body, bodyClass);
  }
  private removeBodyClass(bodyClass: string) {
    this.renderer.removeClass(this.document.body, bodyClass);
  }

  setTheme(selectedtheme: string) {
    for (const theme of this.themes) {
      if (theme.name !== selectedtheme) {
        this.removeBodyClass(theme.name);
      } else {
        this.addBodyClass(theme.name);
      }
    }
  }

}
