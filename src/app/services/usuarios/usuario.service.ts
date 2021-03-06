import { Injectable } from '@angular/core';
import { Usuario } from '../../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(public _http: HttpClient, public route: Router, public _archivo: SubirArchivoService ) { this.cargarStorage() }

  estaLog() {
    if (localStorage.getItem('token')) {

      return (this.token.length > 5) ? true : false;
    } else {
      return false;
    }
  } 

  renovarToken() {
    
    let url = `${URL_SERVICES}/renovartoken?token=${this.token}`;

    return this._http.get(url).map((tok: any) => {
      this.token = tok.token
      localStorage.setItem('token', this.token);

        return true
    }).catch( err => {
      alert('Error al renovar Token')
        this.cerrarSesion()
      return Observable.throw(err);
      
    })
  }

  cerrarSesion() {
    this.usuario = null;
    this.token = '';
    this.menu = null
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
    localStorage.removeItem('menu');
    

    this.route.navigate(['/login'])
   
  }

  cargarStorage() {
    if ( localStorage.getItem('usuario') ) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.usuario = null
    }
     if (localStorage.getItem('token')) {
       this.token = localStorage.getItem('token');
       this.menu = JSON.parse(localStorage.getItem('menu'));
     } else {
          this.token = '';
          this.menu = null
     }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));  
    localStorage.setItem('menu', JSON.stringify(menu));  

    this.usuario = usuario;
    this.token = token;
    this.menu = menu
  }

  login(usuario: Usuario, rec: boolean) {
    let url = `${URL_SERVICES}/login`;

      // FUNCIÓN PARA EL RECUERDAME
    if (rec === true) {
      localStorage.setItem('email', usuario.email)
    } else { localStorage.removeItem('email') }



    return this._http.post(url, usuario).map( (res: any) => {
      this.guardarStorage(res.id, res.token, res.usuario, res.menu)            
      return true;
    }).catch( err => {

        swal('¡DATOS INCORRECTOS!', err.error.mensaje, 'error')

      return Observable.throw(err)
    })
  }

  loginGoogle (token: string) {
    let url = `${URL_SERVICES}/login/google`;

    return this._http.post(url, {token}).map((res: any) => {
        this.guardarStorage(res.id, res.token, res.usuario, res.menu)
        return true;
    })
  }

  crearUsuario(usuario: Usuario) {
    let url = `${URL_SERVICES}/usuario`;

    return this._http.post(url, usuario).map(res => {
      swal('Usuario creado', usuario.email, 'success');
    }).catch( err => {

        swal(err.error.mensaje, err.error.errors.message.split(':')[2], 'error')
      return Observable.throw(err)
    })
  }

  actualizarUsuario(usu: Usuario) {
    let url = `${URL_SERVICES}/usuario/${usu._id}?token=${this.token}`;
   return this._http.put(url, usu)
           .map( (res: any) => {
                 
            if (usu._id === this.usuario._id) {
              this.guardarStorage(res.usuario._id, this.token, res.usuario, this.menu);
            }

            swal('¡Usuario Actualizado!', usu.nombre, 'success')
             
              return true;

           })
  }

  cambiarImagen( file: File, id: string) {
    this._archivo.subirArchivo( file, 'usuarios', id)
    
    .then((res: any) => {
      this.usuario.img = res.usuario.img
        
      swal('¡Imagen actualizada!', this.usuario.nombre, 'success')
        this.guardarStorage(id, this.token, res.usuario, this.menu)
    })
    .catch(res => {
      console.log(res)
    })
  }

  cargarUsuarios ( desde: number = 0 ) {
    let url = `${URL_SERVICES}/usuario?desde=${desde}`;

    return this._http.get(url)
  }

  buscarUsuario(val: string ) {
    let url = `${URL_SERVICES}/busqueda/coleccion/usuarios/${val}`;

    
    return this._http.get(url).map((res: any) => res.usuarios);
  }

    borrarUsuario (usuario: Usuario) {
      let url = `${URL_SERVICES}/usuario/${usuario._id}?token=${this.token}`;

      return this._http.delete(url).map(res => {
          swal('¡Eliminado!', `El usuario ${usuario.nombre} ha sido eliminado.`, 'success');
            return true;
      });
    }
}
