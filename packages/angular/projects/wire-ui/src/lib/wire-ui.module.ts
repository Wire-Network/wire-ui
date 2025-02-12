import { APP_INITIALIZER, NgModule, inject } from '@angular/core';
import { defineCustomElements } from '@wireio/ui-library/dist/loader';
import { DIRECTIVES } from './stencil-generated';

function initializeCustomElements() {
  return () => {
    return defineCustomElements();
  };
}

@NgModule({
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeCustomElements,
      multi: true
    }
  ]
})
export class WireUiModule {}
