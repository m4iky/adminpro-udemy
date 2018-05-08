import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuarios/usuario.service';

@Injectable()
export class AdminGuard implements CanActivate {
  
  constructor(public _usu: UsuarioService) { }

  canActivate() {
    if (this._usu.usuario.role === 'ADMIN_ROLE' ) {
      return true;
    }  else {
      alert('Bloqueado')
      this._usu.cerrarSesion()
      return false;
    };

  }



}
