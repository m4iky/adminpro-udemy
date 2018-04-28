import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardiaGuard } from '../services/services.index';
import { PerfilComponent } from './perfil/perfil.component';


const pagesRoute: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [ LoginGuardiaGuard ],
    children: [
      { path: 'dashboard', component: DashboardComponent, data : {titulo: 'Tablero'} },
      { path: 'perfil', component: PerfilComponent, data : {titulo: 'Perfil'} },
      
      { path: 'progress', component: ProgressComponent, data : {titulo: 'Barra de Progreso'} },
      { path: 'grafica1', component: Graficas1Component, data : {titulo: 'Gráficas'} },
      { path: 'promesas', component: PromesasComponent, data : {titulo: 'Promesas'} },
      { path: 'rxjs', component: RxjsComponent, data : {titulo: 'RXJS'} },

      { path: 'account-settings', component: AccountSettingsComponent, data : {titulo: 'Configuraciones'} },

      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoute );
