import { DisplayStrategy } from './display-strategy';

export interface IAction {
  type: string;
  data?: any;
  action?: Function;
  displayStrategy?: DisplayStrategy;
}
