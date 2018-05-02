import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid';
import { SortIndicatorComponent } from './sort-indicator';

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
