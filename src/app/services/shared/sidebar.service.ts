import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'Graficas', url: '/grafica1' },
        { titulo: 'Barra de Progreso', url: '/progress' }
      ]
    }
  ];

  constructor() {}
}
