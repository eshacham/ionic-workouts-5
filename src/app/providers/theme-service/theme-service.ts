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
    { name: 'orange', image: '/assets/images/themes/orange' },
    { name: 'violet', image: '/assets/images/themes/violet' },
    { name: 'brown', image: '/assets/images/themes/brown' },
    { name: 'green', image: '/assets/images/themes/green' },
    { name: 'blue', image: '/assets/images/themes/blue' },
    { name: 'red', image: '/assets/images/themes/red' },
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
