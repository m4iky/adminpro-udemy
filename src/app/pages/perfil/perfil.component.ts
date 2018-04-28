import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuario.model';
import { UsuarioService, SubirArchivoService } from '../../services/services.index';
import swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

usuario: Usuario;
imagenSubir: File;
imagenTemp: string;

  constructor(public _usu: UsuarioService) { 

    this.usuario = this._usu.usuario
  
  }

    guardar(usu: Usuario) {
      this.usuario.nombre = usu.nombre;
      if (!this.usuario.google ) {
        this.usuario.email = usu.email;

      }

      this._usu.actualizarUsuario(this.usuario)
      .subscribe()
    }

    seleccionImagen(archivo: File) {

      if (!archivo) {
        this.imagenSubir = null
        return;
      }
      if (archivo.type.indexOf('image') < 0) {
          swal('¡Solo puede seleccionar imágenes!', 'Archivo no válido', 'error' )
          this.imagenSubir = null
          return
        }

      this.imagenSubir = archivo
      
      let reader = new FileReader();

      let urlImagenTemp = reader.readAsDataURL ( archivo);

      reader.onloadend = () => {
        this.imagenTemp = reader.result
        
      }

    }

    subirImagen() {

      this._usu.cambiarImagen(this.imagenSubir, this.usuario._id)
    }

  ngOnInit() {
  }

}
