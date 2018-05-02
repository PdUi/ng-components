import { Component, EventEmitter, Input, Output } from '@angular/core';

export enum SortDirection {
  None = 0,
  Descending = 1,
  Ascending = 2
}

@Component({
  selector: 'pd-sort-indicator',
  template: `
    <i class="fas click" [ngClass]="icon" (click)="toggleIcon()"></i>
  `,
  styles: [`
    .fa-sort:after {
      content: "\\21C5";
    }

    .fa-sort-amount-up:after {
      content: "\\2191";
    }

    .fa-sort-amount-down:after {
      content: "\\2193";
    }
  `]
})
export class SortIndicatorComponent {
  sortDirection = SortDirection.None;
  @Output() sort = new EventEmitter<SortDirection>();

  get icon(): string {
    switch (this.sortDirection) {
      case SortDirection.Ascending:
        return 'fa-sort-amount-up';
      case SortDirection.Descending:
        return 'fa-sort-amount-down';
      default :
        return 'fa-sort';
    }
  }

  toggleIcon () {
    switch (this.sortDirection) {
      case SortDirection.Descending:
        this.sortDirection = SortDirection.Ascending;
        break;
      case SortDirection.Ascending:
        this.sortDirection = SortDirection.None;
        break;
      default :
        this.sortDirection = SortDirection.Descending;
        break;
    }

    this.sort.emit(this.sortDirection);
  }
}
