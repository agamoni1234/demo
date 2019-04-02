import { NgModule } from '@angular/core';
import { Routes,
  RouterModule } from '@angular/router';

import {TwitterdashboardComponent} from "./twitterdashboard.component";

const routes: Routes = [
  {
    path: '',
    component: TwitterdashboardComponent,
    data: {
      title: 'Twitter Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TwitterdashboardRoutingModule{}
