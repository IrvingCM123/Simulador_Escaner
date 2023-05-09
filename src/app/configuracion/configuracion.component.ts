import { Component, OnInit, Inject } from '@angular/core';
import { FirestoreService } from '../listas/firestore.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  edificioSeleccionado: string = '';
  salonSeleccionado: string = '';

  constructor(@Inject(FirestoreService) private firestoreService: FirestoreService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('Edificio seleccionado:', this.edificioSeleccionado);
    console.log('Salón seleccionado:', this.salonSeleccionado);
    this.firestoreService.setConfiguracion(this.edificioSeleccionado, this.salonSeleccionado);
  }

}
