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
  scanned: string[] | any;
  scannedData: string[] | Estructura[] | any = { Matricula: '', Nombre: '', Status: '' };
  firestoreData: any[] = [];
  lastScannedData: any = '';

  constructor(
    private dataService: DataService,
    private firestoreService: FirestoreService
  ) {}

  async ngOnInit() {
    // Obtiene los datos leídos del array scannedData del servicio
    this.scannedData = this.dataService.getScannedData();
    console.log(this.scanned);
    this.firestoreData = await this.firestoreService.getFirestoreData();
    this.lastScannedData = this.dataService.getLastScannedData();
  }

  variableExisteEnFirestore() {
    return this.firestoreData.some(
      (data: { Matricula: string }) => data.Matricula === this.lastScannedData
    );
  }
}
