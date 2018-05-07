import { Injectable, EventEmitter } from '@angular/core';
import { URL_SERVICES } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Hospital } from '../../modelos/hospital.model';
import { UsuarioService } from '../usuarios/usuario.service';

@Injectable()
export class HospitalService {

  constructor(public _http: HttpClient, public _usu: UsuarioService) {
    console.log('Hospitales Servicios');
  }

 

  cargarHospitales(desde) {
    let url = `${URL_SERVICES}/hospital?desde=${desde}`;

    return this._http.get(url);
  }

  actualizarHospital(hosp: Hospital) {

    let url = `${URL_SERVICES}/hospital/${hosp._id}?token=${this._usu.token}`;
    return this._http.put(url, hosp);
  }

  borrarHospital(hosp: Hospital) {

    let url = `${URL_SERVICES}/hospital/${hosp._id}?token=${this._usu.token}`;
    return this._http.delete(url);
  }

  crearHospital(hospital: Hospital) {

    let url = `${URL_SERVICES}/hospital?token=${this._usu.token}`;

    return this._http.post(url, hospital);
  }

  buscarHospital(val: string) {
    let url = `${URL_SERVICES}/busqueda/coleccion/hospitales/${val}`;

    return this._http.get(url).map((res: any) => res.hospitales);
  }

  buscarIDHospital(id: string) {
    let url = `${URL_SERVICES}/hospital/${id}`;

    return this._http.get(url)
  }
}
