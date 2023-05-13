import { Component, OnInit, Inject } from '@angular/core';
import { FirestoreService } from '../Servicios/FirestoreListas.service';
import { LocalStorageService } from '../Servicios/DatosLocales.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css'],
})
export class ConfiguracionComponent implements OnInit {
  edificioSeleccionado: string = 'Selecciona un edificio';
  salonSeleccionado: string = 'Selecciona un salón';

  constructor(
    @Inject(LocalStorageService)
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    const edificio = this.localStorageService.obtener_DatoLocal(
      'edificioSeleccionado'
    );
    const salon =
      this.localStorageService.obtener_DatoLocal('salonSeleccionado');

    if (edificio && salon) {
      this.edificioSeleccionado = edificio;
      this.salonSeleccionado = salon;
    }
  }

  onSubmit() {
    this.localStorageService.guardar_DatoLocal(
      'edificioSeleccionado',
      this.edificioSeleccionado
    );
    this.localStorageService.guardar_DatoLocal(
      'salonSeleccionado',
      this.salonSeleccionado
    );
  }
}
