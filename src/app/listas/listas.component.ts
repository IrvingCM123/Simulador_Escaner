import { Component, OnInit } from '@angular/core';
import { DataService } from '../camara/mandar.service';
import { FirestoreService } from './firestore.service';

interface Estructura {
  Matricula: string;
  Nombre: string;
  Estado: string;
  Hora: string;
}

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css']
})
export class ListasComponent implements OnInit {

  datosLeidos: Estructura[] = [];
  listaAsistencia: any[] = [];
  nrcMateria = '';
  carrera = '';

  lastMatriculaScanned: string | any = '';
  lastNombreScanned: string | any = '';
  lastStatusScanned: string | any = '';

  constructor(
    private dataService: DataService,
    private firestoreService: FirestoreService
  ) { }

  async ngOnInit() {
    this.datosLeidos = this.dataService.getScannedData();

    this.carrera = await this.firestoreService.getCarrera();
    this.nrcMateria = await this.firestoreService.getNrcByHorario();
    this.listaAsistencia = await this.firestoreService.getFirestoreData(this.nrcMateria, this.carrera);

    this.dataService.MatriculaObservable.subscribe((matricula: string) => {
      this.lastMatriculaScanned = matricula;
    });

    this.dataService.NombreObservable.subscribe((nombre: string) => {
      this.lastNombreScanned = nombre;
    });

    this.dataService.StatusObservable.subscribe((status: string) => {
      this.lastStatusScanned = status;
    });
  }

  isPresent(matricula_Recibida: Estructura): boolean {
    const found = this.listaAsistencia.find(
      (Lista_De_Asistencia) => Lista_De_Asistencia.Matricula === matricula_Recibida.Matricula
    );
    return !!found;
  }


  getNrc() {
    console.log('a', this.nrcMateria)
    return this.firestoreService.getCarrera().then((_Data) => (this.carrera = _Data));
  }

  getCarrera() {
    return this.firestoreService.getNrcByHorario().then((_Data) => (this.nrcMateria = _Data));
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
