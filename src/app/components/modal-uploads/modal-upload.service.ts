import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {
  public id: string;
  public tipo: string;

  public oculto: string = 'oculto';

  public notificación = new EventEmitter<any>()

  constructor() { 
  }

  ocultarModal() {
    this.oculto = 'oculto';
    this.tipo = null;
    this.id = null;
  }

  mostrarModal(tipo: string, id: string) {
    this.oculto = '';
    this.tipo = tipo;
    this.id = id;
  }
}
