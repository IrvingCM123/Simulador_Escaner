import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private almacenarDatosQRObservable = new Subject<any>();

  constructor() { }

  obtener_DatoLocal(indice: string): any {
    return localStorage.getItem(indice);
  }

  guardar_DatoLocal(indice: string, valor: any): void {
    localStorage.setItem(indice, valor);
    this.almacenarDatosQRObservable.next(valor);
  }

  eliminar_DatoLocal(indice: string): void {
    localStorage.removeItem(indice);
  }

  guardar_ArregloLocal(indice: string, valor: any): void {
    const arreglo_Local = JSON.parse(this.obtener_DatoLocal(indice)) || [];
    arreglo_Local.push(valor);
    this.guardar_DatoLocal(indice, JSON.stringify(arreglo_Local));
    console.log(arreglo_Local)
  }

  obtenerAlmacenarDatosQRObservable(): Observable<any> {
    return this.almacenarDatosQRObservable.asObservable();
  }
}
