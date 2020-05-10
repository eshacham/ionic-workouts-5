import { Injectable, RendererFactory2, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export enum Themes {
  OrangeSilverGunmetal = 'Orange-Silver-Gunmetal',
  PinkPurple = 'Pink-Purple',
  RedBlue = 'Red-Blue',
  GreenWheatEggplant = 'Asparagus-Wheat-Eggplant',
  Blue = 'Blue',
  YellowRedBrown = 'Yellow-Red-Brown'
}

@Injectable({
  providedIn: 'root'
})
export class ThemeServiceProvider {

  public static defaultTheme: Themes = Themes.OrangeSilverGunmetal;
  renderer: Renderer2;

  themes: Themes[] = [
    Themes.OrangeSilverGunmetal,
    Themes.PinkPurple,
    Themes.RedBlue,
    Themes.GreenWheatEggplant,
    Themes.Blue,
    Themes.YellowRedBrown,
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
      if (theme !== selectedtheme) {
        this.removeBodyClass(theme);
      } else {
        this.addBodyClass(theme);
      }
    }
  }

}
