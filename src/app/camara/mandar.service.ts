import { Injectable } from '@angular/core';

interface Estructura {
  Matricula: string;
  Nombre: string;
  Status: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private scannedData: Estructura[] | any[] = [];
  private lastScannedData: Estructura | any = {};

  addScannedData(matricula: string | any, nombre: string | any, status: string | any) {
    this.scannedData.push({ Matricula: matricula, Nombre: nombre, Status: status });
    this.lastScannedData = { Matricula: matricula, Nombre: nombre, Status: status };
  }

  getScannedData() {
    return this.scannedData;
  }

  getLastScannedData() {
    return this.lastScannedData;
  }
}
