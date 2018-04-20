import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    

      this.contar().then(
        mes => console.log('¡Terminó!', mes)
      ).catch ( error => console.error('Error en la Promesa', error))

   }

   contar(): Promise<boolean> {
 
      return new Promise((resolve, reject) => {

    let contador = 0;

    let inter = setInterval(() => {

      contador += 1;
      console.log(contador);

      if (contador === 3) {

        resolve(true);
        clearInterval(inter);
      }

    }, 1000);
  });

   }

  ngOnInit() {
  }

}
