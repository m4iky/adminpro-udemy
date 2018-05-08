import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardiaGuard, AdminGuard } from '../services/services.index';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


const pagesRoute: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [ LoginGuardiaGuard ],
    children: [
      { path: 'dashboard', component: DashboardComponent, data : {titulo: 'Tablero'} },
      
      { path: 'progress', component: ProgressComponent, data : {titulo: 'Barra de Progreso'} },
      { path: 'grafica1', component: Graficas1Component, data : {titulo: 'Gráficas'} },
      { path: 'promesas', component: PromesasComponent, data : {titulo: 'Promesas'} },
      { path: 'rxjs', component: RxjsComponent, data : {titulo: 'RXJS'} },
      { path: 'account-settings', component: AccountSettingsComponent, data : {titulo: 'Configuraciones'} },
      
      { path: 'perfil', component: PerfilComponent, data : {titulo: 'Perfil'} },
      { path: 'busqueda/:termino', component: BusquedaComponent, data : {titulo: 'Buscador'} },
          
              // MANTENIMIENTOS
      { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data : {titulo: 'Usuarios'} },
      { path: 'hospitales', component: HospitalesComponent, data : {titulo: 'Hospitales'} },
      { path: 'medicos', component: MedicosComponent, data : {titulo: 'Médicos'} },
      { path: 'medico/:id', canActivate: [AdminGuard], component: MedicoComponent, data : {titulo: 'Actualizando Médico'} },
        
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoute );
