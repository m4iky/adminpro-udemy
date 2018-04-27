import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuarios/usuario.service';

@Injectable()
export class LoginGuardiaGuard implements CanActivate {
 constructor(public _usu: UsuarioService, public router: Router) { }
  canActivate() {
    if ( this._usu.estaLog() ) { 
      console.log('Correcto.')
    return true;
  } else {
      this.router.navigate(['/login'])
    return false;
     }
  }
}
