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
  nrcMateria: string = '';
  carrera: string = '';
  datosCargados: boolean = false;

  constructor(
    private firestoreService: FirestoreService,
    @Inject(LocalStorageService) private localStorageService: LocalStorageService
  ) {}

  async ngOnInit() {

    this.localStorageService.obtenerAlmacenarDatosQRObservable().subscribe((nuevoValor: any) => {
        this.datosLeidos = JSON.parse(nuevoValor) || [];
      });

    const Obtener = this.localStorageService.obtener_DatoLocal('almacenarDatosQR');
    this.datosLeidos = Obtener ? JSON.parse(Obtener) : [];

    this.carrera = await this.firestoreService.getCarrera();
    this.nrcMateria = await this.firestoreService.getNrcByHorario();
    this.listaAsistencia = await this.firestoreService.getFirestoreData(this.nrcMateria, this.carrera);

    this.datosCargados = true;

  }

  aparece_en_Lista(alumno_recibido: Estructura): boolean {
    const buscar = this.listaAsistencia.find( (buscar_coincidencia) =>
      buscar_coincidencia.Matricula === alumno_recibido.Matricula
    );
    return !!buscar;
  }

}
