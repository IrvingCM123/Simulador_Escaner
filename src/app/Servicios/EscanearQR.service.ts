import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './DatosLocales.service';

interface Estructura {
  Matricula: string;
  Nombre: string;
  Estado: string;
  Hora: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private localStorageService: LocalStorageService) {
    this.obtener = this.localStorageService.obtener_DatoLocal('almacenarDatosQR');
  }

  private obtener: any = '';
  private obtener_Datos: Estructura[] | any = [];
  private datos_Almacenados: any;
  private datos_Lista: Estructura[] | any[] = this.obtener ? JSON.parse(this.obtener) : [];
  //public MatriculaObservable = new BehaviorSubject<string>('');
  //public NombreObservable = new BehaviorSubject<string>('');
  //public StatusObservable = new BehaviorSubject<string>('');

  almacenarDatosQR(
    matricula: string | any,
    nombre: string | any,
    status: string | any,
    hora: string | any
  ) {
    this.obtener_Datos = this.localStorageService.obtener_DatoLocal('almacenarDatosQR');
    this.datos_Almacenados = JSON.parse(this.obtener_Datos || '[]');

    const verificar_Existencia = this.datos_Almacenados.some((data: Estructura) => {
      return (
        data.Matricula === matricula &&
        data.Nombre === nombre &&
        data.Estado === status
      );
    });

    if (!verificar_Existencia) {
      const newObject: Estructura = {
        Matricula: matricula,
        Nombre: nombre,
        Estado: status,
        Hora: hora,
      };
      this.localStorageService.guardar_ArregloLocal('almacenarDatosQR', newObject);
      this.datos_Lista = JSON.parse(
        this.localStorageService.obtener_DatoLocal('almacenarDatosQR') || '[]'
      );
      //this.MatriculaObservable.next(matricula);
      //this.NombreObservable.next(nombre);
      //this.StatusObservable.next(status);
    }
  }

  obtenerDatosQR() {
    return this.datos_Lista;
  }
}
