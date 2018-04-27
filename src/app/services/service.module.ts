import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { 
          SettingsService,
          SharedService,
          SidebarService,
          UsuarioService,
          LoginGuardiaGuard     

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
    LoginGuardiaGuard
  ],
  declarations: []
})
export class ServiceModule { }
