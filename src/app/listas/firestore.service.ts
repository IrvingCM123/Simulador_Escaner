import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  Edificio: string | any;
  Salon: string | any;
  Dia: string  | any;
  Hora: string | any;

  constructor(private firestore: AngularFirestore) {
    this.Edificio = 'Edificio 1';
    this.Salon = 'Salón 6';
    this.Dia = 'Lunes';
    this.Hora = '11:00-13:00'
   }

  async getCarrera() {
    const carrera = await this.firestore.collection('/' + this.Edificio + '/' + this.Salon + '/Carrera').get().toPromise();
    if (carrera) {
      const data = carrera.docs.map(doc => doc.data());
      const data_Carrera: string | any = data[0];
      return data_Carrera.Carrera;
    } else {
      console.log("No se puede obtener la información de Firestore")
      return [];
    }
  }

  async getNrcByHorario() {
    const nrc = await this.firestore.collection('/' + this.Edificio + '/' + this.Salon + '/' + 'Horarios/' + this.Dia + '/' + this.Hora + '/').get().toPromise();
    if (nrc) {
      const data = nrc.docs.map(doc => doc.data());
      const data_Nrc: string | any = data[0];
      console.log(data_Nrc.NRC)
      return data_Nrc.NRC;
    } else {
      console.log("No se pudo obtener la información de Firestore.");
      return [];
    }
  }

  async getFirestoreData(carrera: string, nrc: string) {
    carrera='ISW'
    nrc= '3968196038'
    const lista = await this.firestore.collection('/' + carrera + '/Materias/' + nrc).get().toPromise();
    if (lista) {
      const data_Lista = lista.docs.map(doc => doc.data());
      return data_Lista;
    } else {
      console.log("No se pudo obtener la información de Firestore.");
      return [];
    }
  }

}
