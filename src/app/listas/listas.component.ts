import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from '../Servicios/EscanearQR.service';
import { FirestoreService } from '../Servicios/FirestoreListas.service';
import { LocalStorageService } from '../Servicios/DatosLocales.service';

interface Estructura {
  Matricula: string;
  Nombre: string;
  Estado: string;
  Hora: string;
}

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css'],
})
export class ListasComponent implements OnInit {
  datosLeidos: Estructura[] = [];
  mostrarLista: Estructura[] = [];
  listaAsistencia: any[] = [];
  nrcMateria = '';
  carrera = '';
  datosCargados = false;

  //lastMatriculaScanned: string | any = '';
  //lastNombreScanned: string | any = '';
  //lastStatusScanned: string | any = '';

  constructor(
    private dataService: DataService,
    private firestoreService: FirestoreService,
    @Inject(LocalStorageService)
    private localStorageService: LocalStorageService
  ) {}

  async ngOnInit() {
    this.localStorageService
      .obtenerAlmacenarDatosQRObservable()
      .subscribe((nuevoValor: any) => {
        this.datosLeidos = JSON.parse(nuevoValor) || [];
      });

    const Obtener = this.localStorageService.obtener_DatoLocal('almacenarDatosQR');
    this.datosLeidos = Obtener ? JSON.parse(Obtener) : [];

    this.carrera = await this.firestoreService.getCarrera();
    this.nrcMateria = await this.firestoreService.getNrcByHorario();
    this.listaAsistencia = await this.firestoreService.getFirestoreData(
      this.nrcMateria,
      this.carrera
    );

    this.datosCargados = true;

    /*this.dataService.MatriculaObservable.subscribe((matricula: string) => {
      this.lastMatriculaScanned = matricula;
    });

    this.dataService.NombreObservable.subscribe((nombre: string) => {
      this.lastNombreScanned = nombre;
    });

    this.dataService.StatusObservable.subscribe((status: string) => {
      this.lastStatusScanned = status;
    });*/
  }

  isPresent(matricula_Recibida: Estructura): boolean {
    const found = this.listaAsistencia.find(
      (Lista_De_Asistencia) =>
        Lista_De_Asistencia.Matricula === matricula_Recibida.Matricula
    );
    return !!found;
  }

  /*public getMatricula() {
    return this.lastMatriculaScanned;
  }

  public getNombre() {
    return this.lastNombreScanned;
  }

  public getStatus() {
    return this.lastStatusScanned;
  }*/
}
