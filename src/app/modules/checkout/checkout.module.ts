import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { components } from './components';
import {
  containers,
  CheckoutContainerComponent,
  CheckoutSuccessComponent,
  CheckoutFailedComponent
} from './containers';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CheckoutContainerComponent,
  },
  {
    path: 'success',
    pathMatch: 'full',
    component: CheckoutSuccessComponent,
  },
  {
    path: 'failed',
    pathMatch: 'full',
    component: CheckoutFailedComponent,
  }
];

@NgModule({
  declarations: [
    ...containers,
    ...components,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class CheckoutModule { }
