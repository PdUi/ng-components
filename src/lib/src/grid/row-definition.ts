import { ICellDefinition } from './cell-definition';

export interface IRowDefinition<T> {
  cellDefinitions: ICellDefinition<T>[];
}
