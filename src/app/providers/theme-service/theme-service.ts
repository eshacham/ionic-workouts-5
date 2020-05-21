import { Injectable, RendererFactory2, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export enum Themes {
  GunmetalSilverOrange = 'Gunmetal-Silver-Orange',
  OliveLiverCadet = 'Olive-Liver-Cadet',
  NavyWhiteSilver = 'Navy-White-Silver',
  PurpleSilkPink = 'Purple-Silk-Pink',
  AsparagusWheatEggplant = 'Asparagus-Wheat-Eggplant',
  OxfordSteelBlue = 'Oxford-Steel-Blue',
  SmokyGoldRed = 'Smoky-Gold-Red'
}

@Injectable({
  providedIn: 'root'
})
export class ThemeServiceProvider {

  public static defaultTheme: Themes = Themes.GunmetalSilverOrange;
  renderer: Renderer2;

  themes: Themes[] = [
    Themes.GunmetalSilverOrange,
    Themes.OliveLiverCadet,
    Themes.NavyWhiteSilver,
    Themes.PurpleSilkPink,
    Themes.AsparagusWheatEggplant,
    Themes.OxfordSteelBlue,
    Themes.SmokyGoldRed,
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
