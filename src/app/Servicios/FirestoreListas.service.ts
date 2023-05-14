import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Datos_Locales } from './DatosLocales.service';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {

  Edificio: string | any;
  Salon: string | any;
  Dia: string | any;
  Hora: string | any;

  constructor(
    private firestore: AngularFirestore,
    @Inject(Datos_Locales) private datos_locales: Datos_Locales
  ) {
    this.Dia = 'Lunes';
    this.Hora = '11:00-13:00';
    this.Edificio = datos_locales.obtener_DatoLocal('edificioSeleccionado');
    this.Salon = this.datos_locales.obtener_DatoLocal('salonSeleccionado');
  }

  async getCarrera() {

    const carrera = await this.firestore.collection('/' + this.Edificio + '/' + this.Salon + '/Carrera').get().toPromise();

    if (carrera) {
      const data = carrera.docs.map((doc) => doc.data());
      const data_Carrera: string | any = data[0];
      return data_Carrera.Carrera;
    } else {
      console.log('No se puede obtener la información de Firestore');
      return [];
    }

  }

  async getNrcByHorario() {

    let url = '/' + this.Edificio + '/' + this.Salon + '/Horarios/' + this.Dia + '/' + this.Hora + '/';
    const nrc_obtenido = await this.firestore.collection(url).get().toPromise();

    if (nrc_obtenido) {
      const datos_recibidos = nrc_obtenido.docs.map((datos) => datos.data());
      const nrc_materia: string | any = datos_recibidos[0];
      return nrc_materia.NRC;
    } else {
      console.log('No se pudo obtener la información de Firestore.');
      return [];
    }

  }

  async getListaAsistencia(nrc: string, carrera: string) {

    let url = '/' + carrera + '/Materias/' + nrc;
    const lista_encontrada = await this.firestore.collection(url).get().toPromise();

    if (lista_encontrada) {
      const datos_lista = lista_encontrada.docs.map((alumnos) => alumnos.data());
      return datos_lista;
    } else {
      console.log('No se pudo obtener la información de Firestore.');
      return [];
    }
  }

}
