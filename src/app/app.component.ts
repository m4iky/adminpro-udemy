import { Component, OnInit } from '@angular/core';
import { SettingsService } from './services/services.index';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor( public _ajustes: SettingsService) {
    
  }

  ngOnInit() {
  }
}
