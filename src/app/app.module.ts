import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PdUiNgModule } from '../lib';

import { AppComponent } from './app.component';
import { WindowComponent } from './window.component';
import * as ExampleComponents from './examples';

import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponents.GridComponent,
    WindowComponent
  ],
  imports: [
    BrowserModule,
    PdUiNgModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
