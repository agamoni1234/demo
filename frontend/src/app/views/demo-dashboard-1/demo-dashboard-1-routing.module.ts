import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemoDashboard1Component } from './demo-dashboard-1.component';

const routes: Routes = [
  {
    path: '',
    component: DemoDashboard1Component,
    data: {
      title: 'Demo Dashboard 1'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoDashboard1RoutingModule {}
