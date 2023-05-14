import { Component, Inject, OnInit } from '@angular/core';
import { Datos_Locales } from '../Servicios/DatosLocales.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  valor_Camara: boolean = true;

  constructor(
    @Inject(Datos_Locales)
    private datos_locales: Datos_Locales
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.valor_Camara == false) {
      this.valor_Camara = true;
      this.datos_locales.actualizar_DatoLocal(
        'Camara',
        this.valor_Camara
      );
      this.datos_locales.obtenerCamaraObservable().next(true); // Cambiar el valor de camaraSubject a true
    } else {
      this.valor_Camara = false;
      this.datos_locales.actualizar_DatoLocal(
        'Camara',
        this.valor_Camara
      );
      this.datos_locales.obtenerCamaraObservable().next(false); // Cambiar el valor de camaraSubject a false
    }
  }
}
