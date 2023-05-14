import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Datos_Locales {
  private almacenarDatosQRObservable = new Subject<any>();
  private camaraSubject = new BehaviorSubject<boolean>(
    localStorage.getItem('Camara') === 'true'
  );

  constructor() {}

  obtener_DatoLocal(indice: string): any {
    console.log('a', indice);
    return localStorage.getItem(indice);
  }

  guardar_DatoLocal(indice: string, valor: any): void {
    localStorage.setItem(indice, valor);
    this.almacenarDatosQRObservable.next(valor);
  }

  eliminar_DatoLocal(indice: string): void {
    localStorage.removeItem(indice);
  }

  actualizar_DatoLocal(indice: string, valor: any) {
    localStorage.setItem(indice, JSON.stringify(valor));
    console.log('a', valor);
  }

  guardar_ArregloLocal(indice: string, valor: any): void {
    const arreglo_Local = JSON.parse(this.obtener_DatoLocal(indice)) || [];
    arreglo_Local.push(valor);
    this.guardar_DatoLocal(indice, JSON.stringify(arreglo_Local));
    console.log(arreglo_Local);
  }

  obtenerAlmacenarDatosQRObservable(): Observable<any> {
    return this.almacenarDatosQRObservable.asObservable();
  }

  obtenerCamaraObservable(): Subject<boolean> {
    return this.camaraSubject;
  }
}
