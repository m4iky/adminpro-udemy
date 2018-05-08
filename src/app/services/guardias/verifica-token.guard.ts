import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuarios/usuario.service';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

  constructor(public _usu: UsuarioService ) {}

  canActivate(): Promise<boolean> | boolean {

    console.log('TOKEN GUARDIA')
      let token = this._usu.token;

      let payload = JSON.parse( atob(token.split('.')[1]) )
      console.log(payload)
      let expirado = this.expirado(payload.exp)

        if (expirado) {
          this._usu.cerrarSesion()
            return false
        } else {
          return true;
        }

     

  }

  verficarRenovar(fecha: number): Promise<boolean> {
    
    return new Promise( (resolve, reject) => {
      let tokenExp = new Date(fecha * 1000);
      let ahora = new Date();

      ahora.setTime(ahora.getTime() + (4 * 60 * 60 * 1000) );
         
        if ( tokenExp.getTime() > ahora.getTime()) {
          resolve(true);
        } else {
          this._usu.renovarToken().subscribe(() => {
                    resolve(true);
          }, () => {
                    this._usu.cerrarSesion()
                    reject(false);
          })
        }
    })

  }

  expirado(fecha: number) {
    let ahora = new Date().getTime() / 1000;

    if (fecha < ahora) {
      return true;
    } else {
      return false;
    }
  }
}
