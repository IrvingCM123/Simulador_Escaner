import { Component, Inject, OnInit } from '@angular/core';
import { LocalStorageService } from '../Servicios/DatosLocales.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  valor_Camara: boolean = true;

  constructor(
    @Inject(LocalStorageService)
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.valor_Camara == false) {
      this.valor_Camara = true;
      this.localStorageService.actualizar_DatoLocal(
        'Camara',
        this.valor_Camara
      );
      this.localStorageService.obtenerCamaraObservable().next(true); // Cambiar el valor de camaraSubject a true
    } else {
      this.valor_Camara = false;
      this.localStorageService.actualizar_DatoLocal(
        'Camara',
        this.valor_Camara
      );
      this.localStorageService.obtenerCamaraObservable().next(false); // Cambiar el valor de camaraSubject a false
    }
  }
}
