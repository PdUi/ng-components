export interface IColumnDefinition {
  displayName?: string;
  title?: string;
  content: (record: any) => string;
}
