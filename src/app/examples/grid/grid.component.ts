import {
  AfterContentInit,
  Component,
  ElementRef,
  TemplateRef,
  ViewChild
} from '@angular/core';

import {
  address,
  date,
  name,
  random
} from 'faker';

import {
  IColumnHeaderDefinition,
  IRowDefinition,
  DisplayStrategy,
  ObjectPropertyDisplayStrategy,
  SortIndicatorComponent
} from '../../../lib';

interface IPerson {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  createdDate: Date;
}

@Component({
  selector: 'app-grid',
  template: `
    <ng-template #test let-grid let-context="context">
      <pd-sort-indicator (sort)="grid.act(context.action, context.columnHeaderDefinition, { columnName: 'City', event: $event })"></pd-sort-indicator>
    </ng-template>
    <ng-template #firstNameHeader let-emitter let-direction="newDirection">
      <span
        (click)="emitter.emit('foo'); newDirection = !newDirection ? 'ascending' : newDirection === 'ascending' ? 'descending' : null"
        [ngSwitch]="newDirection">
        Name
        <i *ngSwitchCase="'ascending'">&#x2191;</i>
        <i *ngSwitchCase="'descending'">&#x2193;</i>
        <i *ngSwitchDefault>&#x21C5;</i>
      </span>
    </ng-template>
    <ng-template #starHeader><span (click)="console.log('clicked')">&#x22C6;</span></ng-template>
    <ng-template #firstName let-person>{{person?.lastName}}, {{person?.firstName}}</ng-template>
    <pd-grid
      [rowDefinition]="rowDefinition"
      [columnHeaderDefinitions]="columnHeaderDefinitions"
      [records]="data"
      (emitter)="console.log(2); console.log($event)">
    </pd-grid>
  `,
  styles: [`
  `]
})
export class GridComponent implements AfterContentInit {
  console = console;
  @ViewChild('firstName') firstNameTemplate: TemplateRef<any>;
  @ViewChild('firstNameHeader') firstNameHeaderTemplate: TemplateRef<any>;
  @ViewChild('starHeader') starHeaderTemplate: TemplateRef<any>;
  @ViewChild('test') sortIndicatorHeaderTemplate: TemplateRef<SortIndicatorComponent>;

  rowDefinition: IRowDefinition<IPerson>;
  columnHeaderDefinitions: IColumnHeaderDefinition[];
  data: IPerson[];

  constructor() {
    this.data = this.generatePeople(50);
  }

  ngAfterContentInit() {
    this.rowDefinition = {
      cellDefinitions: [
        new ObjectPropertyDisplayStrategy<IPerson>('id'),
        new ObjectPropertyDisplayStrategy<IPerson>(this.firstNameTemplate),
        new ObjectPropertyDisplayStrategy<IPerson>('city'),
        new ObjectPropertyDisplayStrategy<IPerson>((record) => record.createdDate.toDateString())
      ]
    };
    this.columnHeaderDefinitions = [
      { displayStrategy: new DisplayStrategy('Id') },
      { displayStrategy: new DisplayStrategy(this.firstNameHeaderTemplate), title: 'Name' },
      { displayStrategy: new DisplayStrategy('City'), title: 'City', actions: [{ type: 'sort', displayStrategy: new DisplayStrategy(this.sortIndicatorHeaderTemplate) }] },
      { displayStrategy: new DisplayStrategy(this.starHeaderTemplate), title: 'Like' }
    ];
  }

  generatePeople(numberToGenerate: number): IPerson[] {
    const people: IPerson[] = [];

    for (let i = 0; i < numberToGenerate; i++) {
      people.push({
        id: random.number(),
        city: address.city(),
        firstName: name.firstName(),
        lastName: name.lastName(),
        createdDate: date.between(new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date(Date.now()))
      });
    }

      return people;
  }
}
