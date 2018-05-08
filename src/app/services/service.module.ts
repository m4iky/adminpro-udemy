import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { 
          SettingsService,
          SharedService,
          SidebarService,
          UsuarioService,
          LoginGuardiaGuard,     
          SubirArchivoService,
          HospitalService,
          MedicoService,
          AdminGuard

       } from './services.index';
import { ModalUploadService } from '../components/modal-uploads/modal-upload.service';



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
    AdminGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService
  ],
  declarations: []
})
export class ServiceModule { }
