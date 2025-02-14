import { NgModule } from '@angular/core';
import { defineCustomElements } from '@wireio/ui-library/dist/loader';
import { DIRECTIVES } from './stencil-generated';

defineCustomElements();

@NgModule({
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES],
  imports: []
})
export class WireUiModule { }
export * from './stencil-generated/components';
