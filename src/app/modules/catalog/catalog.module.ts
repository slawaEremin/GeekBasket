import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { containers, CatalogContainerComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CatalogContainerComponent,
  }
];

@NgModule({
  declarations: [
    ...containers
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class CatalogModule { }
