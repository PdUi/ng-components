import { TemplateRef } from '@angular/core';

export enum DisplayStrategyType {
  Template = 0,
  FunctionTransform = 1,
  String = 2
}

export class DisplayStrategy {
  content: TemplateRef<any> | string;
  displayStrategyType: DisplayStrategyType;

  constructor(content: TemplateRef<any> | string) {
    this.content = content;
    setDisplayStrategyType(this, content);
  }
}

export class ObjectPropertyDisplayStrategy<T> {
  content: TemplateRef<any> | ((record: T) => string) | string;
  displayStrategyType: DisplayStrategyType;

  constructor(content: TemplateRef<any> | ((record: T) => string) | string) {
    this.content = content;
    setDisplayStrategyType(this, content);
  }
}

function setDisplayStrategyType(
  displayStrategy: { displayStrategyType: DisplayStrategyType },
  content: TemplateRef<any> | ((record: any) => string) | string
) {
  // https://stackoverflow.com/questions/50237478/how-can-one-determine-if-an-object-is-a-viewref
  if (content instanceof TemplateRef) {
    displayStrategy.displayStrategyType = DisplayStrategyType.Template;
  } else if (content instanceof Function) {
    displayStrategy.displayStrategyType = DisplayStrategyType.FunctionTransform;
  } else {
    displayStrategy.displayStrategyType = DisplayStrategyType.String;
  }
}
