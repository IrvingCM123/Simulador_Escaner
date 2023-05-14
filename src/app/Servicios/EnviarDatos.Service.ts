import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import FirebaseApp from 'firebase/compat/app';
import Firebase from 'firebase/compat';
import { Datos_Locales } from './DatosLocales.service';
import { ConexionService } from './Conexion.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EnviarDatosService {
  private db: Firebase.firestore.Firestore;
  private datos_Almacenados: any[] | any;

  constructor(
    private firestore: AngularFirestore,
    private datos_locales: Datos_Locales,
    private conexionService: ConexionService,
    private http: HttpClient // add this line
  ) {
    this.db = FirebaseApp.firestore();
  }

  async enviarDatos() {
    this.datos_Almacenados = this.datos_locales.obtenerDatosQR();

    if (this.datos_Almacenados.length === 0) {
      return;
    }

    if (this.conexionService.estaConectado) {
      this.datos_Almacenados.forEach(async (datos: any) => {
        await this.firestore.collection('/api/ListaAsistencia').add(datos);
        this.datos_locales.eliminar_DatoLocal('almacenarDatosQR');
      });
    } else {
      this.datos_Almacenados.forEach(async (datos: any) => {
        await this.db.collection('datosQR').add(datos);
        this.datos_locales.eliminar_DatoLocal('almacenarDatosQR');
      });
    }
}

}
