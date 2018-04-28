import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/services.index';
import { Usuario } from '../../modelos/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;
  

  constructor(public _usu: UsuarioService) { }

  ngOnInit() {
    this.usuario = this._usu.usuario
  }

}
