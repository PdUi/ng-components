import { GridActionType } from './grid-action-type';
import { IColumnHeaderDefinition } from './column-header-definition';

export interface IGridAction<T> {
  type: GridActionType;
  columnHeaderDefinition?: IColumnHeaderDefinition;
  record?: T;
  data?: any;
}
