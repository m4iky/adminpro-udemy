import { Component, OnInit } from '@angular/core';
import { HospitalService, MedicoService } from '../../services/services.index';
import { Hospital } from '../../modelos/hospital.model';
import { NgForm } from '@angular/forms';
import { Medico } from '../../modelos/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-uploads/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '')
  hospital: Hospital = new Hospital('', '')
  constructor(public _hosp: HospitalService, public _med: MedicoService, public _router: Router, public activatedR: ActivatedRoute,
     public _modal: ModalUploadService) { 

    activatedR.params.subscribe(res => {
          if (res.id !== 'nuevo') {
                this.cargarMedico(res.id)
          }
    })
  }

  ngOnInit() {

    this._hosp.cargarHospitales(0).subscribe((h: any) => {
      this.hospitales = h.hospitales
    })

    this._modal.notificación.subscribe(res => {
          this.medico.img = res.medico.img
    })
  }

  cargarMedico(id: string) {
    this._med.cargarMedico(id).subscribe((medico: any) => {
      this.medico = medico
      this.medico.hospital = medico.hospital._id
      this.cambioHospital(this.medico.hospital)
    })
  }

  guardarMedico(f: NgForm) {
      
    if (!f.valid) {
      return;
    }

    this._med.guardarMedico(this.medico).subscribe((med: any) => {
        console.log(med)
      this.medico = med.medico
        this._router.navigate(['/medico', this.medico._id])
    })
    
      
  }

  cambiarFoto() {
    this._modal.mostrarModal('medicos', this.medico._id);
  }

  cambioHospital(id) {
    this._hosp.buscarIDHospital(id).subscribe((h: any) => this.hospital = h.hospital)
  }

}
