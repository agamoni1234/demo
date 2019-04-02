import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PBIDemoDashboard1Component } from './pbi-demo-dashboard-1.component';

const routes: Routes = [
  {
    path: '',
    component: PBIDemoDashboard1Component,
    data: {
      title: 'PBI Demo Dashboard 1'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PBIDemoDashboard1RoutingModule {}
