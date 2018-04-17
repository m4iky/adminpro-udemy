import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgreso') txtProgreso: ElementRef;
  @Input() progreso: number = 50
  @Input() leyenda: string;
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  cambiarM( nuevoValor: number) {

      


    let val = nuevoValor
   if ( nuevoValor >= 100) {
      this.progreso = 100
    } else if ( nuevoValor <= 0) {
      this.progreso = 0
    } else {
      this.progreso  = nuevoValor
    } 

    this.txtProgreso.nativeElement.value = this.progreso

    this.cambioValor.emit(this.progreso)
  }

  cambiarValor(v) {
  
        if (this.progreso + v >= 100) {
          this.progreso = 100
          this.cambioValor.emit(this.progreso);
          
          return;
        }
  
         if (this.progreso + v <= 0) {
          this.progreso = 0;
          this.cambioValor.emit(this.progreso)
           
           return;
         }
      this.progreso += v
          this.cambioValor.emit(this.progreso);
      

    }
}
