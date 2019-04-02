import { NgModule } from '@angular/core';
import { Routes,
  RouterModule } from '@angular/router';

import {FoldermanagementdashboardComponent} from "./foldermanagementdashboard.component";

const routes: Routes = [
  {
    path: '',
    component: FoldermanagementdashboardComponent,
    data: {
      title: 'Folder Management Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class foldermanagementdashboardRoutingModule{}
