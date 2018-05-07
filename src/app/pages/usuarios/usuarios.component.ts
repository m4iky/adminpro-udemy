import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuario.model';
import { UsuarioService } from '../../services/services.index';
import swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-uploads/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _usu: UsuarioService, public _modal: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._modal.notificación.subscribe(res => this.cargarUsuarios())
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usu.cargarUsuarios ( this.desde ).subscribe( (a: any) => {
        this.totalRegistros = a.total
        this.usuarios = a.usuarios
        this.cargando = false;
        

    })
  }

  mostrarModal(usu: Usuario) {
    console.log(usu._id)
    this._modal.mostrarModal('usuarios', usu._id);
  }

  cambiarDesde (val: number ) {
    let des = this.desde + val;

    if (des < 0) {
        des = 0
    }
    
    this.desde = des
    this.cargarUsuarios()
  }

  buscarUsuario(val: string) {

    if (val === '') {
      return this.cargarUsuarios();
    }

    this._usu.buscarUsuario(val).subscribe( (res: any) => {
         this.usuarios = res;
         this.cargando = false;
        
    })
  }

  borrarUsuario(usuario: Usuario) {
    if ( usuario._id === this._usu.usuario._id ) {
        swal('¡No se puede eliminar a sí mismo!', 'ERROR', 'error');
        return;
    }
      swal({
        title: '¿Está seguro?',
        text: `¡Está a punto de eliminar a ${usuario.nombre.split(' ')[0]}!`,
        type: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
        cancelButtonText: '¡Eliminar!',
        confirmButtonText: 'Cancelar'
        
      }).then(result => {
        if (!result.value) {
          this._usu.borrarUsuario(usuario).subscribe(a => {
            this.cargarUsuarios()
          })
        } else {
          swal('Cancelado!', 'El usuario está seguro', 'info')
        }
      });

  }

  actualizar(usuario: Usuario) {
      this._usu.actualizarUsuario(usuario).subscribe()

  }

}
