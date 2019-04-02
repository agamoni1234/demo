import { NgModule } from '@angular/core';
import { Routes,
  RouterModule } from '@angular/router';

import {CdrdashboardComponent} from "./cdrdashboard.component";

const routes: Routes = [
  {
    path: '',
    component: CdrdashboardComponent,
    data: {
      title: 'Cdr Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CdrdashboardRoutingModule{}