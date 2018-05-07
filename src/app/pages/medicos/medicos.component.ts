import { Component, OnInit } from '@angular/core';
import { Medico } from './../../modelos/medico.model';
import { ModalUploadService } from '../../components/modal-uploads/modal-upload.service';
import { MedicoService } from '../../services/services.index';
import swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  desde: number = 0;

  medicos: Medico[] = [];
  total: number = 0;

  constructor(public _modal: ModalUploadService, public _med: MedicoService) {}

  ngOnInit() {
    this.cargarMedicos()
  }

  cargarMedicos() {
    this._med.cargarMedicos(this.desde).subscribe((m: any) => {
      this.medicos = m.Médicos
        this.total = m.total

        
      })
  }    

  buscarMedico(val) {
      if (val === '') {
        this.cargarMedicos()
        return
      }

      this._med.buscarMedico(val).subscribe(med => {
        this.medicos = med
        this.total = this.medicos.length
      })
  }

  cambiarDesde(val: number) {
    let des = this.desde + val;

    if (des < 0) {
      des = 0;
    }

    this.desde = des;
    this.cargarMedicos();
  }


  borrarMedico(med: Medico) {
    
      this._med.borrarMedico(med._id).subscribe(res => {
        this.cargarMedicos()
        swal('¡Elminado!', `El médico ${med.nombre} ha sido eliminado.`, 'success')
      })
  }


  mostrarModal(med: Medico) {
    this._modal.mostrarModal('medicos', med._id);
  }
}
