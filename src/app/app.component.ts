import { Component, OnInit } from '@angular/core';
import { ConexionService } from './Servicios/Conexion.service';
import { EnviarDatosService } from './Servicios/EnviarDatos.Service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private conexionService: ConexionService, private enviarDatosService: EnviarDatosService) { }

  ngOnInit() {
    this.conexionService.estaConectado.subscribe((estaConectado: boolean) => {
      if (estaConectado) {
        console.log(estaConectado)
        this.enviarDatosService.enviarDatos();
      }
    });
  }
}
