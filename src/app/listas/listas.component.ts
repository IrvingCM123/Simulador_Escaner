import { Component, Inject, OnInit } from '@angular/core';
import { FirestoreService } from '../Servicios/FirestoreListas.service';
import { Datos_Locales } from '../Servicios/DatosLocales.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
    @Inject(Datos_Locales) private datos_locales: Datos_Locales,
    private firestore: AngularFirestore,
  ) {}

  async ngOnInit() {

    this.datos_locales.Lista_Datos_QR_Observable().subscribe((nuevoValor: any) => {
        this.datosLeidos = JSON.parse(nuevoValor) || [];
      });

    const Obtener = this.datos_locales.obtener_DatoLocal('almacenarDatosQR');
    this.datosLeidos = Obtener ? JSON.parse(Obtener) : [];

    this.carrera = await this.firestoreService.getCarrera();
    this.nrcMateria = await this.firestoreService.getNrcByHorario();
    this.listaAsistencia = await this.firestoreService.getListaAsistencia(this.nrcMateria, this.carrera);

    this.datosCargados = true;

  }

  aparece_en_Lista(alumno_recibido: Estructura): boolean {
    const buscar = this.listaAsistencia.find( (buscar_coincidencia) =>
      buscar_coincidencia.Matricula === alumno_recibido.Matricula
    );
    return !!buscar;
  }

  enviarDato() {
    // Obtenemos una referencia a la colección de Firestore donde queremos guardar el dato
    const coleccion = this.firestore.collection('nombreDeLaColeccion');

    // Creamos el objeto que queremos guardar en Firestore
    const dato = {
      nombre: 'Ejemplo',
      edad: 30,
      fecha: new Date(),
    };

    // Enviamos el dato a Firestore
    coleccion.add(dato)
      .then(() => {
        console.log('Dato guardado correctamente en Firestore');
      })
      .catch((error) => {
        console.error('Error al guardar el dato en Firestore: ', error);
      });
  }


}
