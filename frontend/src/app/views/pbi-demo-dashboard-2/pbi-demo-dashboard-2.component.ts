import 'datatables.net';
import {
    Component,
    OnInit,
    NgModule
}
from '@angular/core';
import {
    Router
}
from '@angular/router';


import {
    HttpClient
}
from '@angular/common/http';
import {
    AppService
}
from '../../app.service';
import {
    AppServiceBackendApi
}
from '../../app.servicebackendapi';

declare var $:any;


import {NgbModule, NgbPopover} from '@ng-bootstrap/ng-bootstrap';
// import * as bt from
import { ModalModule } from 'ngx-bootstrap/modal';

import 'rxjs/add/operator/map';




@NgModule({
  imports: [NgbModule,NgbPopover,ModalModule]
})
@Component({
    templateUrl: 'pbi-demo-dashboard-2.component.html'
})
export class PBIDemoDashboard2Component implements OnInit {
  constructor(private router: Router, public http: HttpClient, private AppServiceObj: AppService, public AppServiceBackendApiObj:
    AppServiceBackendApi) {
  }
  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if (token == null) {
      this.router.navigate(['login']);
    }
  }
}
