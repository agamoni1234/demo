import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import {TwitterdashboardHTComponent} from "./twitterdashboardHT.component";

const routes: Routes = [
  {
    path: '',
    component: TwitterdashboardHTComponent,
    data: {
      title: 'Twitter Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TwitterdashboardHTRoutingModule{}
