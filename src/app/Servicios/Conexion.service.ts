import { Injectable } from '@angular/core';
import { ConnectionService } from 'ngx-connection-service';

@Injectable({
  providedIn: 'root',
})
export class ConexionService {
  estaConectado: boolean | any;

  constructor(private connectionService: ConnectionService) {
    this.connectionService.monitor().subscribe((estaConectado: any) => {
      console.log(estaConectado)
      this.estaConectado = estaConectado;
    });
  }
}
