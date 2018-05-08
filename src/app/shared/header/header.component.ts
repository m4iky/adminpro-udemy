import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/services.index';
import { Usuario } from '../../modelos/usuario.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;
  

  constructor(public _usu: UsuarioService, public router: Router) { 

  }

  ngOnInit() {
    this.usuario = this._usu.usuario
  }

  buscar(termino) {
    this.router.navigate(['/busqueda', termino])  
  }

}
