import { NgModule } from '@angular/core';
import { Routes,
  RouterModule } from '@angular/router';

import {MlComponent} from "./mldemo.component";

const routes: Routes = [
  {
    path: '',
    component: MlComponent,
    data: {
      title: 'ML Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MlRoutingModule{}
