import { Component, ElementRef, Input, Renderer2 } from '@angular/core';

import { IColumnDefinition } from './column-definition';

@Component({
  selector: 'pd-grid',
  template: `
    <div
      *ngFor="let columnDefinition of columnDefinitions"
      role="columnheader"
      title="columnDefinition.title">
        {{columnDefinition.displayName}}
    </div>
    <ng-container *ngFor="let record of records">
      <div *ngFor="let columnDefinition of columnDefinitions" role="gridcell">
        {{columnDefinition.content(record)}}
      </div>
    </ng-container>
  `,
  styles: [`
  `],
  preserveWhitespaces: false
})
export class GridComponent {
  private _records: any[];
  private _columnDefinitions: IColumnDefinition[];

  @Input() get records(): any[] {
    return this._records;
  }
  set records(records: any[]) {
    this._records = records;
    this.update();
  }

  @Input() get columnDefinitions(): IColumnDefinition[] {
    return this._columnDefinitions;
  }
  set columnDefinitions(columnDefinitions: IColumnDefinition[]) {
    this._columnDefinitions = columnDefinitions;
    this.update();
  }

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  update() {
    if (this.columnDefinitions && this.columnDefinitions.length) {
      this.renderer.setStyle(this.element.nativeElement, 'role', 'grid');
      this.renderer.setStyle(this.element.nativeElement, 'grid-template-columns', `repeat(${this.columnDefinitions.length}, auto)`);
      this.renderer.setStyle(this.element.nativeElement, 'width', '100%');
      this.renderer.setStyle(this.element.nativeElement, 'display', 'grid');
    }
  }
}
