import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../camara/mandar.service';
import { FirestoreService } from './firestore.service';

interface Estructura {
  Matricula: string;
  Nombre: string;
  Status: string;
}

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css'],
})
export class ListasComponent implements OnInit {
  scannedData: Estructura[] | any = {
    Matricula: '',
    Nombre: '',
    Status: '',
    Hora: '',
  };
  firestoreData: any[] = [];

  lastMatriculaScanned: string | any = '';
  lastNombreScanned: string | any;
  lastStatusScanned: string | any = '';


  constructor(
    public dataService: DataService,
    private firestoreService: FirestoreService
  ) {}

  async ngOnInit() {
    // Obtiene los datos leídos del array scannedData del servicio
    let arreglo: Estructura[] = this.dataService.getScannedData();
    this.scannedData = arreglo;
    this.firestoreService
      .getFirestoreData()
      .then((data) => (this.firestoreData = data));

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

  getMatricula() {
    return this.lastMatriculaScanned;
  }

  getNombre() {
    return this.lastNombreScanned;
  }

  getStatus() {
    return this.lastStatusScanned
  }
}
