import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Usuario } from '../../modelos/usuario.model';
import { SubirArchivoService } from '../../services/services.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-uploads',
  templateUrl: './modal-uploads.component.html',
  styles: []
})
export class ModalUploadsComponent implements OnInit {

  oculto: string = ''

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor(public _subir: SubirArchivoService, public _modal: ModalUploadService) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;

    this._modal.ocultarModal()
  }

  seleccionImagen (archivo: File) {

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
      this._subir.subirArchivo(this.imagenSubir, this._modal.tipo, this._modal.id)
                  .then(res => {
                        console.log(res, 'OK')
                      this._modal.notificación.emit( res );
                      this.cerrarModal()
                  })
                  .catch(err => {
                    console.log('Error en la carga...', err);
                    
                  })
    }

}
