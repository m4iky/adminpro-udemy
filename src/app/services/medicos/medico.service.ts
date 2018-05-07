import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { UsuarioService } from '../usuarios/usuario.service';
import { Medico } from '../../modelos/medico.model';
import swal from 'sweetalert2';

@Injectable()
export class MedicoService {

  constructor(public _http: HttpClient, public _usu: UsuarioService) { }


  cargarMedicos(desde?) {
    if (desde) {
      // tslint:disable-next-line:no-shadowed-variable
      let url = `${URL_SERVICES}/medico?desde=${desde}`;

      return this._http.get(url);
    }
    
    let url = `${URL_SERVICES}/medico`;
    
    return this._http.get(url)
  }

  cargarMedico(id: string) {
    let url = `${URL_SERVICES}/medico/${id}`;

    return this._http.get(url).map((res: any) => res.medico)
  }

  buscarMedico(val) {
     let url = `${URL_SERVICES}/busqueda/coleccion/medicos/${val}`;

     return this._http.get(url).map((res: any) => res.medicos);
  }

  borrarMedico(id) {
      let url = `${URL_SERVICES}/medico/${id}?token=${this._usu.token}`;
     
      return this._http.delete(url)
  }

  guardarMedico(medico: Medico) {


    if (medico._id) {
      // Actualizando
      let url = `${URL_SERVICES}/medico/${medico._id}?token=${this._usu.token}`;
      
      return this._http.put(url, medico).map((med: any) => {
        console.log(med)
        swal(med.medico.nombre, '¡actualizado!', 'success')
        return med
      })
    } else {
      // Creando
      let url = `${URL_SERVICES}/medico?token=${this._usu.token}`;
      return this._http.post(url, medico).map((med: any) => {
        swal(med.medico.nombre, '¡creado!', 'success')
        return med
      })
    }

  }
}
