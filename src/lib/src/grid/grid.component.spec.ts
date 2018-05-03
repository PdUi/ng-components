import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';
import { DisplayStrategy, ObjectPropertyDisplayStrategy } from './display-strategy';

class TestObject {
  id: number;
  description1: string;
  description2: string;

  constructor(id: number, description1: string, description2?: string) {
    this.id = id;
    this.description1 = description1;
    this.description2 = description2;
  }
}

describe('GridComponent', () => {
  let component: GridComponent<TestObject>;
  let fixture: ComponentFixture<GridComponent<TestObject>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent<GridComponent<TestObject>>(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a columnheader', () => {
    component.columnHeaderDefinitions = [{ displayStrategy: new DisplayStrategy('Id') }];
    fixture.detectChanges();
    const columnHeaders = fixture.nativeElement.querySelectorAll('[role="columnheader"]');
    expect(columnHeaders.length).toBe(component._columnHeaderDefinitions.length);
  });

  it('should create a columnheader with given text', () => {
    component.columnHeaderDefinitions = [{ displayStrategy: new DisplayStrategy('Id') }];
    fixture.detectChanges();
    const columnHeader = fixture.nativeElement.querySelector('[role="columnheader"]');
    expect(columnHeader.textContent).toContain(component._columnHeaderDefinitions[0].displayStrategy.content);
  });

  it('should create a columnheader with no title', () => {
    component.columnHeaderDefinitions = [{ displayStrategy: new DisplayStrategy('Id') }];
    fixture.detectChanges();
    const columnHeader = fixture.nativeElement.querySelector('[title]');
    expect(columnHeader).toBeNull();
  });

  it('should create a columnheader with given title', () => {
    component.columnHeaderDefinitions = [{ displayStrategy: new DisplayStrategy('Id'), title: 'Unique Identifier' }];
    fixture.detectChanges();
    const columnHeader = fixture.nativeElement.querySelector('[role="columnheader"]');
    expect(columnHeader.title).toContain(component._columnHeaderDefinitions[0].title);
  });

  it('should create a gridcell', () => {
    component.rowDefinition = { cellDefinitions: [new ObjectPropertyDisplayStrategy<TestObject>('id')] };
    component.records = [new TestObject(1, 'test object')];
    fixture.detectChanges();
    const cells = fixture.nativeElement.querySelectorAll('[role="gridcell"]');
    expect(cells.length).toBe(1);
  });

  it('should create a gridcell with text from property', () => {
    component.rowDefinition = { cellDefinitions: [new ObjectPropertyDisplayStrategy<TestObject>('id')] };
    component.records = [new TestObject(1, 'test object')];
    fixture.detectChanges();
    const cell = fixture.nativeElement.querySelector('[role="gridcell"]');
    expect(cell.textContent).toContain(component._records[0].id);
  });

  it('should create a gridcell with function return value', () => {
    component.rowDefinition = { cellDefinitions: [new ObjectPropertyDisplayStrategy<TestObject>((obj) => `${obj.description2}, ${obj.description1}`)] };
    component.records = [new TestObject(1, 'test object', 'hello world')];
    fixture.detectChanges();
    const cell = fixture.nativeElement.querySelector('[role="gridcell"]');
    expect(cell.textContent).toContain(`${component._records[0].description2}, ${component._records[0].description1}`);
  });
});
