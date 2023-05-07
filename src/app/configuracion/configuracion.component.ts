import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  public Edificio = '';
  public Salon = '';

  constructor() { }

  ngOnInit(): void {
    this.Edificio = 'Edificio 1';
    this.Salon = 'Salón 6'
  }

}
