import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { DataService } from '../camara/mandar.service';

@Component({
  selector: 'app-mandar-datos',
  templateUrl: './mandar-datos.component.html',
  styleUrls: ['./mandar-datos.component.css']
})
export class MandarDatosComponent implements OnInit {

  Datos: any = '';
  fecha_Actual: any = '';
  Hora: any = '';
  DatosLocal: string[] = [];
  DatoLista: string[] = [];

  constructor(private firestore: AngularFirestore, private dataService: DataService) {

    const fecha = new Date();

    this.fecha_Actual = fecha.getFullYear() + '-' + ( fecha.getMonth() + 1 ) + '-' + fecha.getDate();
    this.Hora = fecha.getHours() + ':' + fecha.getMinutes();

    //this.DatosLocal = this.dataService.getScannedData(); console.log(this.DatosLocal);
    //this.DatoLista = this.dataService.getLastScannedData(); console.log(this.DatoLista);

    this.Datos = [ {Matricula: 'zS20006735', Nombre: 'Irving Rafael Conde Marín', Status: 'Presente', NRC: 98429, Docente: '3968196038'}, {Matricula: 'zS20006432', Nombre: 'Elizabeth Galindo Pedraza', Status: 'Presente', NRC: 98429, Docente: '3968196038'} ]

  }

  ngOnInit(): void {

    const docente = this.Datos[0].Docente
    const nrc = this.Datos[0].NRC

    const url = docente + '/' + nrc + '/' + this.fecha_Actual;

    this.Datos.forEach((alumno: { Matricula: any; Nombre: any; Status: any; }) => {
      const nombre_Doc = alumno.Matricula;
      const NuevosDatos = {
        hora: this.Hora,
        Matricula: alumno.Matricula,
        Nombre: alumno.Nombre,
        Status: alumno.Status
      };
      this.firestore.collection(url).doc(nombre_Doc).set(NuevosDatos);
    });

  }

}
