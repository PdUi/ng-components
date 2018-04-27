import { Component } from '@angular/core';

import { IColumnDefinition } from '../../../lib/index';

@Component({
  selector: 'app-grid',
  template: `<pd-grid [columnDefinitions]="columnDefinitions" [records]="data"></pd-grid>`,
  styles: [``]
})
export class GridComponent {
  columnDefinitions: IColumnDefinition[] = [
    { displayName: 'Id', content: (record) => record.id.toString() },
    { displayName: 'First Name', content: (record) => record.firstName }
  ];

  data = [
    { id: 1, firstName: 'Jack' },
    { id: 2, firstName: 'Jill' }
  ];
}
