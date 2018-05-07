import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

// MODULOS
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';

// RUTAS
import { PAGES_ROUTES } from './pages.routes';

// Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';

// Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadsComponent } from '../components/modal-uploads/modal-uploads.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        PerfilComponent,
        UsuariosComponent,
        ModalUploadsComponent,
        HospitalesComponent,
        MedicosComponent,
        MedicoComponent
        
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule

    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent
    ]
  })

  export class PagesModule {}



