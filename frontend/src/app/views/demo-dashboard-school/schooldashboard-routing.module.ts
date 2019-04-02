import { NgModule } from '@angular/core';
import { Routes,
  RouterModule } from '@angular/router';

import {SchooldashboardComponent} from "./schooldashboard.component";

const routes: Routes = [
  {
    path: '',
    component: SchooldashboardComponent,
    data: {
      title: 'School Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchooldashboardRoutingModule{}
