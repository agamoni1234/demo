import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoLayoutComponent } from './containers';
import { ConsoleLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ForgotPasswordComponent } from './views/forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from './views/resetpassword/resetpassword.component';
import { ConsolePageComponent } from './views/console-page/console-page.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'logout',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent,
    data: {
      title: 'Forgot Password Page'
    }
  },
  {
    path: 'resetpassword',
    component: ResetPasswordComponent,
    data: {
      title: 'Reset Password Page'
    }
  },
  {
    path: '',
    component: DemoLayoutComponent,
    data: {
      title: 'Demo'
    },
    children: [
      {
        path: 'demo-dashboard-1',
        loadChildren: './views/demo-dashboard-1/demo-dashboard-1.module#DemoDashboard1Module'
      },
      {
        path: 'demo-dashboard-2',
        loadChildren: './views/demo-dashboard-cdr/cdrdashboard.module#CdrdashboardModule'
      },
      {
        path: 'demo-dashboard-3',
        loadChildren: './views/demo-dashboard-school/schooldashboard.module#SchooldashboardModule'
      },
      {
        path: 'demo-dashboard-4',
        loadChildren: './views/demo-dashboard-HT/twitterdashboardHT.module#TwitterdashboardHTModule'
      },
      {
        path: 'pbi-demo-dashboard-1',
        loadChildren: './views/pbi-demo-dashboard-1/pbi-demo-dashboard-1.module#PBIDemoDashboard1Module'
      },
      {
        path: 'pbi-demo-dashboard-2',
        loadChildren: './views/pbi-demo-dashboard-2/pbi-demo-dashboard-2.module#PBIDemoDashboard2Module'
      }
    ]
  },
  {
    path: '',
    component: ConsoleLayoutComponent,
    data: {
      title: 'Console'
    },
    children: [
      {
        path: 'console',
        loadChildren: './views/console-page/console-page.module#ConsolePageModule'
      },
      {
        path: 'twitter-dashboard',
        loadChildren: './views/twitterdashboard/twitterdashboard.module#TwitterdashboardModule'
      },
      {
        path: 'powerbi',
        loadChildren: './views/powerbi/powerbi.module#PowerbiModule'
      },
      {
        path: 'ml',
        loadChildren: './views/mldemo/mldemo.module#MlModule'
      },
      {
        path: 'file-management',
        loadChildren: './views/foldermanagementdashboard/foldermanagementdashboard.module#FoldermanagementdashboardModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
