import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from './../../services/services.index';
import { Usuario } from '../../modelos/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  
  usuario: Usuario;

  constructor(public _sideBar: SidebarService, public _usu: UsuarioService) { }

  ngOnInit() {
    this.usuario = this._usu.usuario;
  }

}
