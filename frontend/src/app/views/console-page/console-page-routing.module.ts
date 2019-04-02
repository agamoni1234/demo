import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { ConsolePageComponent } from './console-page.component';

const routes: Routes = [
  {
    path: '',
    component: ConsolePageComponent,
    data: {
      title: 'Console'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsolePageRoutingModule {}
