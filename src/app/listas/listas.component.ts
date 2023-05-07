import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../camara/mandar.service';
import { FirestoreService } from './firestore.service';

interface Estructura {
  Matricula: string;
  Nombre: string;
  Estado: string;
}

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css'],
})
export class ListasComponent implements OnInit {
  _Datos_Leidos: Estructura[] | any = {
    Matricula: '',
    Nombre: '',
    Estado: '',
    Hora: '',
  };
  _Lista_Asistencia: any[] = [];
  _NrcMateria = '';
  _Carrera = '';

  lastMatriculaScanned: string | any = '';
  lastNombreScanned: string | any;
  lastStatusScanned: string | any = '';

  constructor(
    public _dataService: DataService,
    private _firestoreService: FirestoreService
  ) {}

  async ngOnInit() {
    // Obtiene los datos leídos del array scannedData del servicio
    let recibir_Datos = this._dataService.getScannedData();
    this._Datos_Leidos = recibir_Datos;

    this._firestoreService
      .getNrcByHorario()
      .then((_Data) => (this._NrcMateria = _Data));

    this._firestoreService
      .getCarrera()
      .then((_Data) => (this._Carrera = _Data));

    this._firestoreService
      .getFirestoreData(this._NrcMateria, this._Carrera)
      .then((_Data) => (this._Lista_Asistencia = _Data));

    this._dataService.MatriculaObservable.subscribe((matricula: string) => {
      this.lastMatriculaScanned = matricula;
    });

    this._dataService.NombreObservable.subscribe((nombre: string) => {
      this.lastNombreScanned = nombre;
    });

    this._dataService.StatusObservable.subscribe((status: string) => {
      this.lastStatusScanned = status;
    });
  }

  isPresent(matricula_Recibida: Estructura): boolean {
    const found = this._Lista_Asistencia.find(
      (Lista_De_Asistencia) => Lista_De_Asistencia.Matricula === matricula_Recibida.Matricula
    );
    return !!found;
  }

  getMatricula() {
    return this.lastMatriculaScanned;
  }

  getNombre() {
    return this.lastNombreScanned;
  }

  getStatus() {
    return this.lastStatusScanned;
  }
}
