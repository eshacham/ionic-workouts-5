import { Injectable, RendererFactory2, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface ITheme {
  name: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeServiceProvider {
  public static defaultTheme = 'gray-orange-black';
  renderer: Renderer2;

  themes: ITheme[] = [
    { name: 'orange-theme', image: '/assets/images/themes/orange-theme' },
    { name: 'pink-theme', image: '/assets/images/themes/pink-theme' },
    { name: 'red-theme', image: '/assets/images/themes/red-theme' },
    { name: 'green-theme', image: '/assets/images/themes/green-theme' },
    { name: 'blue-theme', image: '/assets/images/themes/blue-theme' },
    { name: 'yellow-theme', image: '/assets/images/themes/yellow-theme' },
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
