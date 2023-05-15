import { Injectable, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import {FirestoreService}  from './FirestoreListas.service'

export interface Estructura {
  Matricula: string;
  Nombre: string;
  Estado: string;
  Hora: string;
}

@Injectable({
  providedIn: 'root'
})

export class ConexionService {

  private onlineOffline = new BehaviorSubject<boolean>(navigator.onLine);
  carrera = this.firestoreService.getCarrera();
  nrcMateria = this.firestoreService.getNrcByHorario();

  constructor(@Inject(AngularFirestore) private firestore: AngularFirestore, private firestoreService: FirestoreService, ) {
    window.addEventListener('online', () => {
      console.log('Conexión a internet establecida');
      this.enviarDatos();
      this.onlineOffline.next(true);

    });

    window.addEventListener('offline', () => {
      console.log('Conexión a internet perdida');
      this.onlineOffline.next(false);
    });
  }

  get isOnline() {
    return this.onlineOffline.asObservable();
  }

  async enviarDatos() {
    const listaAsistencia: any = await this.firestoreService.getListaAsistencia(await this.nrcMateria, await this.carrera);
    const datosAEnviar = this.verificarDatos(listaAsistencia);

    datosAEnviar.forEach((dato: any) => {
      const coleccion = this.firestore.collection('Tomar Asistencia').doc(dato.Matricula).set(dato).then(() => {
        console.log('Dato guardado correctamente en Firestore');
      }).catch(error => {
        console.error('Error al guardar el dato en Firestore: ', error);
      });
    });
  }

  verificarDatos(lista: Estructura[]): Estructura[] {
    const datosLeidos = JSON.parse(
      localStorage.getItem('almacenarDatosQR') || '[]'
    );

    return datosLeidos.filter((dato: { Matricula: string; }) => {
      const buscar = lista.find(alumno => alumno.Matricula === dato.Matricula);
      return !!buscar;
    });
  }

  getOnlineStatus(): BehaviorSubject<boolean> {
    return this.onlineOffline;
  }

}
