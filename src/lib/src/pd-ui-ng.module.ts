import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/index';
import { SortIndicatorComponent } from './sort-indicator/index';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GridComponent,
    SortIndicatorComponent
  ],
  exports: [
    GridComponent,
    SortIndicatorComponent
  ]
})
export class PdUiNgModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PdUiNgModule,
      providers: []
    };
  }
}
