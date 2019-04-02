import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PBIDemoDashboard2Component } from './pbi-demo-dashboard-2.component';

const routes: Routes = [
  {
    path: '',
    component: PBIDemoDashboard2Component,
    data: {
      title: 'PBI Demo Dashboard 2'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PBIDemoDashboard2RoutingModule {}
