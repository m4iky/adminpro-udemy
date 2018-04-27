import { Injectable } from '@angular/core';
import { Usuario } from '../../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
// import 'rxjs/add/operator/map';
import swal from 'sweetalert2';
import { Router } from '@angular/router';



@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: String;

  constructor(public _http: HttpClient, public route: Router ) { this.cargarStorage() }

  estaLog() {
    if (localStorage.getItem('token')) {

      return (this.token.length > 5) ? true : false;
    } else {
      return false;
    }
  }

  cerrarSesion() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
    

    this.route.navigate(['/login'])
   
  }

  cargarStorage() {
    if ( localStorage.getItem('usuario') ) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }
     if (localStorage.getItem('token')) {
       this.token = localStorage.getItem('token');
     }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));  

    this.usuario = usuario;
    this.token = token;
  }

  login(usuario: Usuario, rec: boolean) {
    let url = `${URL_SERVICES}/login`;

      // FUNCIÓN PARA EL RECUERDAME
    if (rec === true) {
      localStorage.setItem('email', usuario.email)
    } else { localStorage.removeItem('email') }



    return this._http.post(url, usuario).map( (res: any) => {

        this.guardarStorage(res.id, res.token, res.usuario)
      // localStorage.setItem('id', res.id);
      // localStorage.setItem('token', res.token);  
      // localStorage.setItem('usuario', JSON.stringify(res.usuario));  
        
      return true;

    })
  }

  loginGoogle (token: string) {
    let url = `${URL_SERVICES}/login/google`;

    return this._http.post(url, {token}).map((res: any) => {
        this.guardarStorage(res.id, res.token, res.usuario)
        return true;
    })
  }

  crearUsuario(usuario: Usuario) {
    let url = `${URL_SERVICES}/usuario`;

    return this._http.post(url, usuario).map(res => {
      swal('Usuario creado', usuario.email, 'success');
    });
  }
}
