import { Component, ViewChild, AfterContentInit, ElementRef, TemplateRef } from '@angular/core';

import { name, random, date } from 'faker';

import { IColumnDefinition } from '../../../lib';

interface IPerson {
  id: number;
  firstName: string;
  lastName: string;
  createdDate: Date;
}

@Component({
  selector: 'app-grid',
  template: `
    <ng-template #firstName let-person>{{person?.firstName}}<br /> {{person?.lastName}}</ng-template>
    <pd-grid [columnDefinitions]="columnDefinitions" [records]="data"></pd-grid>
  `,
  styles: [``]
})
export class GridComponent implements AfterContentInit {
  @ViewChild('firstName') firstNameTemplate: TemplateRef<any>;

  columnDefinitions: IColumnDefinition<IPerson>[];
  data: IPerson[];

  constructor() {
    this.data = this.generatePeople(2);
  }

  ngAfterContentInit() {
    this.columnDefinitions = [
      { displayName: 'Id', propertyName: 'id' },
      { displayName: 'Name', template: this.firstNameTemplate },
      { displayName: 'Created On', content: (record) => record.createdDate.toDateString() }
    ];
  }

  generatePeople(numberToGenerate: number): IPerson[] {
    const people: IPerson[] = [];

    for (let i = 0; i < numberToGenerate; i++) {
      people.push({
        id: random.number(),
        firstName: name.firstName(),
        lastName: name.lastName(),
        createdDate: date.between(new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date(Date.now()))
      });
    }

      return people;
  }
}
