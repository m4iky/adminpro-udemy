import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuarios/usuario.service';

@Injectable()
export class SidebarService {
  // menu: any = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Dashboard', url: '/dashboard' },
  //       { titulo: 'Graficas', url: '/grafica1' },
  //       { titulo: 'Barra de Progreso', url: '/progress' },
  //       { titulo: 'Gráfica promesas', url: '/promesas' },
  //       { titulo: 'RXJS', url: '/rxjs' }
        
  //     ]
  //   },
  //    {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: '/usuarios' },
  //       { titulo: 'Hospitales', url: '/hospitales' },
  //       { titulo: 'Médicos', url: '/medicos' },
       
  //     ]
  //   }
  // ];
  menu: any[] = []

  constructor(public _usu: UsuarioService) {
    this.cargarMenu()
  }

  cargarMenu() {
    if (localStorage.getItem('menu')) {
      this.menu = JSON.parse(localStorage.getItem('menu'))
    };
  }

}
