import { ObjectPropertyDisplayStrategy } from './display-strategy';

export interface ICellDefinition<T> {
  displayStrategy: ObjectPropertyDisplayStrategy<T>;
  shouldEmitOnClick?: boolean;
}
