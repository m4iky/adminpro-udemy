import {RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardiaGuard } from './services/services.index';


const appRoutes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: '',
     component: PagesComponent,
     canActivate: [LoginGuardiaGuard],
     loadChildren: './pages/pages.module#PagesModule'
    },
  { path: '**', component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});
