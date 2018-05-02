import { TemplateRef } from '@angular/core';

import { DisplayStrategy } from './display-strategy';
import { IAction } from './action';

export interface IColumnHeaderDefinition {
  displayStrategy?: DisplayStrategy;
  title?: string;
  actions?: IAction[];
}
