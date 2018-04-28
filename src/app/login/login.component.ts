import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/services.index';
import { Usuario } from '../modelos/usuario.model';
import { element } from 'protractor';

declare function init_plugins()
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email;
  recordar = false;
  auth2;

  constructor(public _router: Router, public _usu: UsuarioService) { }

  ingresar(data: NgForm) {
    if (data.invalid) {
      return;
    }

    
    let usuario = new Usuario(null, data.value.email, data.value.password)

      this._usu.login(usuario, data.value.recuerda).subscribe(res => {
         
        this._router.navigate(['/dashboard']);
      })

      

    // this._router.navigate(['/dashboard'])
  }

  ngOnInit() {
      init_plugins();
      this.googleInit()
        this.email = localStorage.getItem('email') || ''; 
       
        if ( this.email.length ) { 
          this.recordar = true
        }   
    }

    googleInit() {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '63442296782-ihljo7pgjld72t0jmlr09n5cqsl9u9k8.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        })

        this.attachSignIn( document.getElementById('btnGoogle'))
      })
    }


    // tslint:disable-next-line:no-shadowed-variable
    attachSignIn( element ) {

        this.auth2.attachClickHandler( element, {}, (googleUser) => {
          
          // let profile = googleUser.getBasicProfile();
          let token = googleUser.getAuthResponse().id_token

          this._usu.loginGoogle(token).subscribe(res => {
              window.location.href = '#/dashboard'
          })
        })
    }



}
