import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  TemplateRef
} from '@angular/core';

import { IColumnHeaderDefinition } from './column-header-definition';
import { IRowDefinition } from './row-definition';
import { IAction } from './action';

import { DisplayStrategyType } from './display-strategy';

@Component({
  selector: 'pd-grid',
  template: `
    <div
      *ngFor="let columnHeaderDefinition of _columnHeaderDefinitions"
      role="columnheader"
      [attr.title]="columnHeaderDefinition.title ? columnHeaderDefinition.title : null"
      [ngSwitch]="columnHeaderDefinition.displayStrategy.displayStrategyType">
        <ng-container
          *ngSwitchCase="DisplayStrategyType.Template"
          [ngTemplateOutlet]="columnHeaderDefinition.displayStrategy.content"
          [ngTemplateOutletContext]="{ $implicit: emitter }">
        </ng-container>
        <ng-container *ngSwitchCase="DisplayStrategyType.String">
          {{columnHeaderDefinition.displayStrategy.content}}
        </ng-container>

        <ng-container
          *ngFor="let action of columnHeaderDefinition.actions"
          [ngSwitch]="action.displayStrategy.displayStrategyType"
          (click)="act(action, columnHeaderDefinition)">
            <ng-container
              *ngSwitchCase="DisplayStrategyType.Template"
              [ngTemplateOutlet]="action.displayStrategy.content"
              [ngTemplateOutletContext]="{ $implicit: this, context: { action: action, columnHeaderDefinition: columnHeaderDefinition } }">
            </ng-container>
            <ng-container *ngSwitchCase="DisplayStrategyType.String">
              {{action.displayStrategy.content}}
            </ng-container>
        </ng-container>
    </div>
    <ng-container *ngFor="let record of _records">
      <div
        *ngFor="let cellDefinition of _rowDefinition.cellDefinitions"
        role="gridcell"
        [ngSwitch]="cellDefinition.displayStrategyType">
        <ng-container
          *ngSwitchCase="DisplayStrategyType.Template"
          [ngTemplateOutlet]="cellDefinition.content"
          [ngTemplateOutletContext]="{ $implicit: record }">
        </ng-container>
        <ng-container *ngSwitchCase="DisplayStrategyType.FunctionTransform">
          {{cellDefinition.content(record)}}
        </ng-container>
        <ng-container *ngSwitchCase="DisplayStrategyType.String">
          {{record[cellDefinition.content]}}
        </ng-container>
      </div>
    </ng-container>
  `,
  styles: [`
    :host {
      display: grid;
    }

    [role=columnheader] {
      background-color: #FFF;
      position: sticky;
      top: 0;
    }
  `],
  preserveWhitespaces: false
})
export class GridComponent<T> {
  private gridObject: GridComponent<T>;
  DisplayStrategyType = DisplayStrategyType;

  _records: T[];
  _rowDefinition: IRowDefinition<T>;
  _columnHeaderDefinitions: IColumnHeaderDefinition[];

  @Input() set records(records: T[]) {
    this._records = records;
    this.update();
  }

  @Input() set rowDefinition(rowDefinition: IRowDefinition<T>) {
    this._rowDefinition = rowDefinition;
    this.update();
  }

  @Input() set columnHeaderDefinitions(columnHeaderDefinitions: IColumnHeaderDefinition[]) {
    this._columnHeaderDefinitions = columnHeaderDefinitions;
    this.update();
  }

  @Output() emitter = new EventEmitter();

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  update() {
    if (this._rowDefinition && this._rowDefinition.cellDefinitions.length) {
      this.renderer.setAttribute(this.element.nativeElement, 'role', 'grid');
    }

    if (this._columnHeaderDefinitions && this._columnHeaderDefinitions.length) {
      this.renderer.setStyle(this.element.nativeElement, 'grid-template-columns', `repeat(${this._columnHeaderDefinitions.length}, auto)`);
    }

    if (this._records && this._records.length) {
      this.renderer.setStyle(this.element.nativeElement, 'grid-template-rows', `repeat(${this._records.length}, auto)`);
    }
  }

  act(action: IAction, columnHeaderDefinition: IColumnHeaderDefinition, data: any) {
    if (!action.action) {
      this.emitter.emit({ action, columnHeaderDefinition, data });
    } else {
      // TODO: implement perform action
      console.log('TODO: implement perform action');
    }
  }
}
