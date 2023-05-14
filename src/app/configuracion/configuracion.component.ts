import { Component, OnInit, Inject } from '@angular/core';
import { FirestoreService } from '../Servicios/FirestoreListas.service';
import { Datos_Locales } from '../Servicios/DatosLocales.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css'],
})
export class ConfiguracionComponent implements OnInit {
  edificioSeleccionado: string = 'Selecciona un edificio';
  salonSeleccionado: string = 'Selecciona un salón';

  constructor( @Inject(Datos_Locales) private datos_locales: Datos_Locales ) {}

  ngOnInit(): void {
    const edificio = this.datos_locales.obtener_DatoLocal('edificioSeleccionado');
    const salon = this.datos_locales.obtener_DatoLocal('salonSeleccionado');

    if (edificio && salon) {
      this.edificioSeleccionado = edificio;
      this.salonSeleccionado = salon;
    }
  }

  onSubmit() {
    this.datos_locales.guardar_DatoLocal('edificioSeleccionado',this.edificioSeleccionado);
    this.datos_locales.guardar_DatoLocal('salonSeleccionado',this.salonSeleccionado);
  }

}
