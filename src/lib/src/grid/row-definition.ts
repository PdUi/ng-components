import { ObjectPropertyDisplayStrategy } from './display-strategy';

export interface IRowDefinition<T> {
  cellDefinitions: ObjectPropertyDisplayStrategy<T>[];
}
