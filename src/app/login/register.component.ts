import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControlName, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';

import { UsuarioService } from '../services/services.index';
import { Usuario } from '../modelos/usuario.model';
import { Router } from '@angular/router';


declare function init_plugins()

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(public _usu: UsuarioService, public router: Router) {}

  comparar(campo1: string, campo2: string) {
    
    return(campo: FormGroup) => {

      let pass1 = campo.controls[campo1].value;      
      let pass2 = campo.controls[campo2].value;

    if ( pass1 === pass2 ) {
      return null
    }

      return {
        comparar : true
      };
    }
    
  }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required),
      condiciones: new FormControl(false)
    }, {validators: this.comparar('password', 'password2')});
  }

  registrarUsuario() {
    if (!this.forma.valid) {
      return;
    }

    if (!this.forma.value.condiciones) {
      swal('¡IMPORTANTE!', 'Debe aceptar los términos y condiciones.', 'warning')
      return console.log('Debe aceptar las condiciones.')
    }
    
    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password,
      )
      this._usu.crearUsuario(usuario).subscribe(u => {
        this.router.navigate(['/login'])
      })
  }
}
