import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

label: string = '';

  constructor(private _router: Router, public _title: Title, public _meta: Meta) {

     this.getData()
          .subscribe(event => {
            this.label = event
            this._title.setTitle(event)
          let metaTag: MetaDefinition = {
              name: 'description',
              content: this.label
          }
            this._meta.updateTag(metaTag)
          });
   }

    getData() {
        return this._router.events
           .filter(evento => evento instanceof ActivationEnd)
           .filter((evento: ActivationEnd) => evento.snapshot.data.titulo)
           .map((evento: ActivationEnd) => evento.snapshot.data.titulo);
    }

  ngOnInit() {
  }

}
