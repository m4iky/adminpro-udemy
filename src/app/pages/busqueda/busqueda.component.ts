import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URL_SERVICES } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../modelos/usuario.model';
import { Medico } from '../../modelos/medico.model';
import { Hospital } from '../../modelos/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

    usuarios: Usuario[] = []
    medicos: Medico[] = []
    hospitales: Hospital[] = []

  constructor(public aRouter: ActivatedRoute, public http: HttpClient) {
    this.aRouter.params.subscribe(res => {
      let termino = res['termino']
      this.buscar(termino)
    })

   }

  ngOnInit() {
  }


  buscar(termino) {

    let url = `${URL_SERVICES}/busqueda/todo/${termino}`;

    this.http.get(url).subscribe((bus: any) => {
      this.usuarios = bus.usuarios
      this.medicos = bus.médicos
      this.hospitales = bus.hospitales
      console.log(bus)
    })
  }
}
