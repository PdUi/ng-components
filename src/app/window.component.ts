import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

enum DisplayOrientation {
  Portrait = 0,
  Landscape = 1
}

@Component({
  selector: 'app-window',
  template: `
    <iframe id="desktop" [src]="url()" [height]="approximateDesktopHeight + 'px'" [width]="selectedDesktopWidth + 'px'"></iframe>
    <iframe id="tablet" [src]="url()" [height]="approximateTabletHeight + 'px'" [width]="selectedTabletWidth + 'px'"></iframe>
    <iframe id="mobile" [src]="url()" [height]="approximateMobileHeight + 'px'" [width]="selectedMobileWidth + 'px'"></iframe>
  `,
  styles: [`
    iframe {
      display: block;
    }
  `]
})
export class WindowComponent {
  desktopWidthOptions = this.range(992, 2000);
  tabletWidthOptions = this.range(768, 991);
  mobileWidthOptions = this.range(300, 767);

  selectedDesktopWidth = 1200;
  selectedTabletWidth = 850;
  selectedMobileWidth = 350;

  approximateMobileHeight = this.calculateMobileHeight(this.selectedMobileWidth);
  approximateTabletHeight = this.calculateTabletHeight(this.selectedTabletWidth);
  approximateDesktopHeight = this.calculateDesktopHeight(this.selectedDesktopWidth);

  src = '/grid';

  constructor(private sanitizer: DomSanitizer) { }

  url(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
  }

  private range(start: number, end: number): number[] {
    return Array(end - start + 1)
            .fill(undefined)
            .map((_, idx) => start + idx);
  }

  private calculateMobileHeight(mobileWidth: number): number {
    return this.calculateDisplayHeight(mobileWidth, 1.77, DisplayOrientation.Portrait);
  }

  private calculateTabletHeight(tabletWidth: number): number {
    return this.calculateDisplayHeight(tabletWidth, 1.33, DisplayOrientation.Portrait);
  }

  private calculateDesktopHeight(desktopWidth: number): number {
    return this.calculateDisplayHeight(desktopWidth, 1.33, DisplayOrientation.Landscape); // regular ~1.33, high-res ~ 1.9
  }

  private calculateDisplayHeight(displayWidth: number, widthToHeightRatio: number, displayOrientation: DisplayOrientation) {
    /*
      Landscape is where the width is greater than the height.
        If the ratio passed in is greater than 1, the resulting height will be greater than the width.
        Therefore, we need to get the inverse of that ratio before making the height calculation.
    */
    if (displayOrientation === DisplayOrientation.Landscape && widthToHeightRatio > 1) {
      widthToHeightRatio = 1 / widthToHeightRatio;
    }

    /*
      Portrait is where the height is greater than the width.
        If the ratio passed in is less than 1, the resulting width will be greater than the height.
        Therefore, we need to get the inverse of that ratio before making the height calculation.
    */
    if (displayOrientation === DisplayOrientation.Portrait && widthToHeightRatio < 1) {
      widthToHeightRatio = 1 / widthToHeightRatio;
    }

    return Math.floor(displayWidth * widthToHeightRatio);
  }
}
