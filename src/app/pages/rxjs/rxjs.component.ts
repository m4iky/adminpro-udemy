import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

subs: Subscription

  constructor() {

 this.subs = this.regresaObs()
    .subscribe( 
      num => console.log('Subscrito', num),
      error => (console.error('Error', error)),
      () => console.log('¡Contador terminó!')
    )
   }

  ngOnInit() {
  }

  ngOnDestroy(): void {
   this.subs.unsubscribe()
  }

  regresaObs(): Observable<any> {
    return new Observable(observer => {
      let contador = 0;
      let inter = setInterval(() => {
        contador += 1;
        let salida = {
          valor: contador
        }
        observer.next(salida);

        // if (contador === 3) {
        //   clearInterval(inter);
        //   observer.complete();
        // }

        // if (contador === 2) {
        //   observer.error('Aun no es tres');
        // }
      }, 500);
    })
    .retry(2)
    .map( (resp: any) => {
          return resp.valor;
    })
    .filter( valor => {
       if ( valor % 2 === 0) {
          return true
     } else {
       return false
     }


    })
  }

}
