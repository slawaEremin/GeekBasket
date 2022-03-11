import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { components } from './components';

const modules = [
  ReactiveFormsModule,
  FormsModule,
  RouterModule
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    ...modules,
  ],
  exports: [
    ...components,
  ],
})
export class SharedModule { }
