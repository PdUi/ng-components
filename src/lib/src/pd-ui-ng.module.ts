import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GridComponent
  ],
  exports: [
    GridComponent
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
