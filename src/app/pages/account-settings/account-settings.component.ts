import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/services.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document, public _acc: SettingsService) { }

  ngOnInit() {
    this.colocarCheck()
  }

  cambiarColor(link: any, color) {
    this._acc.aplicarTema(color)
    this.aplicarCheck(link)
   
  }

  aplicarCheck(link) {

      let selec: any = document.getElementsByClassName('selector');

      for ( let ref of selec) {
          ref.classList.remove('working')
      }
      link.classList.add('working')
  }

  colocarCheck() {
     let selec: any = document.getElementsByClassName('selector');
      let tema = this._acc.ajustes.tema
     for (let ref of selec) {
        if ( ref.getAttribute('data-theme') === tema) {
          ref.classList.add('working');
         }
     }
  }

}
