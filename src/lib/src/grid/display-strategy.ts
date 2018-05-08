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
  const templateRefPrototype = Object.getPrototypeOf(Object.create(TemplateRef));
  const templateRefInstance = new templateRefPrototype();
  if (Object.getPrototypeOf(Object.getPrototypeOf(content)).constructor.name === templateRefInstance.constructor.name) {
    displayStrategy.displayStrategyType = DisplayStrategyType.Template;
    return;
  }

  switch (typeof content) {
    case typeof Function:
    displayStrategy.displayStrategyType = DisplayStrategyType.FunctionTransform;
      break;
    case typeof String:
    default:
    displayStrategy.displayStrategyType = DisplayStrategyType.String;
      break;
  }
}
