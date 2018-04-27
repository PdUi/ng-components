import { TemplateRef } from '@angular/core';

export interface IColumnDefinition<T> {
  displayName?: string;
  title?: string;
  content?: (record: T) => string;
  template?: TemplateRef<any>;
  propertyName?: string;
}
