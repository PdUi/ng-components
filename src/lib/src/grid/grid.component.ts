import {
  Component,
  ElementRef,
  Input,
  Renderer2
} from '@angular/core';

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
        <ng-container
          *ngIf="columnDefinition.template"
          [ngTemplateOutlet]="columnDefinition.template"
          [ngTemplateOutletContext]="{ $implicit: record }">
        </ng-container>
        <ng-container *ngIf="columnDefinition.content">
          {{columnDefinition.content(record)}}
        </ng-container>
        <ng-container *ngIf="columnDefinition.propertyName">
          {{record[columnDefinition.propertyName]}}
        </ng-container>
      </div>
    </ng-container>
  `,
  styles: [`
    :host {
      display: grid;
      width: 100%;
    }
  `],
  preserveWhitespaces: false
})
export class GridComponent {
  private _records: any[];
  private _columnDefinitions: IColumnDefinition<any>[];

  @Input() get records(): any[] {
    return this._records;
  }
  set records(records: any[]) {
    this._records = records;
    this.update();
  }

  @Input() get columnDefinitions(): IColumnDefinition<any>[] {
    return this._columnDefinitions;
  }
  set columnDefinitions(columnDefinitions: IColumnDefinition<any>[]) {
    this._columnDefinitions = columnDefinitions;
    this.update();
  }

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  update() {
    if (this.columnDefinitions && this.columnDefinitions.length) {
      this.renderer.setAttribute(this.element.nativeElement, 'role', 'grid');
      this.renderer.setStyle(this.element.nativeElement, 'grid-template-columns', `repeat(${this.columnDefinitions.length}, auto)`);
    }
  }
}
