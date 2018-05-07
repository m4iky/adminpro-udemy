import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
  if (!img || img === undefined) {
     let nonUrl = `${URL_SERVICES}/img/no-existe/no-existe`;
    
    return nonUrl
  }
    if (img.indexOf('https') >= 0) {
     return img
   }
   
   let url = `${URL_SERVICES}/img`;

   if (!img ) {
     return url + '/no-existe/no-existe';
   }

   switch (tipo) {
     case 'usuario':
         url += '/usuarios/' + img;      
       break;

       case 'medico':
         url += '/medicos/' + img;
       break;

       case 'hospital':
         url += '/hospitales/' + img;      
       break;
   
     default:
       console.log('Tipo de imagen no permitida: usuario, medico, hospital')
       url += '/no-existe/no-existe';
       break;
   }
   
    return url;
  }

}
