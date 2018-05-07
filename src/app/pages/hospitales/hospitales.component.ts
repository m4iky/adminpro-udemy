import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/services.index';
import { ModalUploadService } from '../../components/modal-uploads/modal-upload.service';
import { Hospital } from '../../modelos/hospital.model';
import swal from 'sweetalert2';

declare var $
// declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  desde: number = 0;
  total: number = 10;
  constructor(
    public _hosp: HospitalService,
    public _modal: ModalUploadService
  ) {}

  buscarHospital(value) {
    if (value === '') {
      return this.cargarHospitales()
    }
    
    this._hosp.buscarHospital(value).subscribe(res => {
      this.hospitales = res;
      this.total = this.hospitales.length
    })
  }

  ngOnInit() {

    this.cargarHospitales();
  
   this._modal.notificación.subscribe(res => this.cargarHospitales());
  }

  cargarHospitales() {
    this._hosp.cargarHospitales(this.desde).subscribe((res: any) => {
      this.total = res.total;
      this.hospitales = res.hospitales;
    });
  }

  cambiarDesde(val: number) {
    let des = this.desde + val;

    if (des < 0) {
      des = 0;
    }

    this.desde = des;
    this.cargarHospitales();
  }

  actualizarHosp(hosp: Hospital) {
    hosp.nombre = $(`#${hosp._id}`).val();

    this._hosp.actualizarHospital(hosp).subscribe(res => {
      this.cargarHospitales();
    });
  }

  borrarHospital(hosp) {
    this._hosp.borrarHospital(hosp).subscribe(res => {
      this.cargarHospitales();
    });
  }

  crearHospital() {
    swal({
      title: 'Nombre del nuevo Hospital',
      input: 'text',
      showCancelButton: true,
      type: 'info',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
     
    }).then(result => {
      if (result.value) {
        let hospital = {
          nombre: result.value,
          img: ''
        };
        this._hosp.crearHospital(hospital).subscribe((res: any) => {
          this.cargarHospitales();
          swal({
            title: `Hospital ${res.hospital.nombre} creado.`,
            type: 'success'
          });
        });
      }
    });
  }

  mostrarModal(hosp: Hospital) {
    this._modal.mostrarModal('hospitales', hosp._id);
  }
  
}
