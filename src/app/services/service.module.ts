import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { 
          SettingsService,
          SharedService,
          SidebarService,
          UsuarioService,
          LoginGuardiaGuard,     
          SubirArchivoService

       } from './services.index';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuardiaGuard,
    SubirArchivoService
  ],
  declarations: []
})
export class ServiceModule { }
