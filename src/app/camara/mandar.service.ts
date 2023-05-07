import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


interface Estructura {
  Matricula: string;
  Nombre: string;
  Status: string;
  Hora: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private scannedData: Estructura[] | any[] = [];
  private lastScanned: Estructura[] | any = [];
  public MatriculaObservable = new BehaviorSubject<string>('');
  public NombreObservable = new BehaviorSubject<string>('');
  public StatusObservable = new BehaviorSubject<string>('');


  addScannedData(matricula: string | any, nombre: string | any, status: string | any, hora: string | any) {

    const alreadyExists = this.scannedData.some((data) => {
      return data.Matricula === matricula && data.Nombre === nombre && data.Status === status;
    });

    if (!alreadyExists) {
      this.scannedData.push({ Matricula: matricula, Nombre: nombre, Status: status, Hora: hora });
      this.lastScanned = { Matricula: matricula, Nombre: nombre, Status: status, Hora: hora };
      this.MatriculaObservable.next(matricula);
      this.NombreObservable.next(nombre);
      this.StatusObservable.next(status);
    }
  }

  getScannedData() {
    return this.scannedData;
  }

}
