import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../Servicios/mandar.service';
import { ListasComponent } from '../listas/listas.component';
@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.css'],
})
export class CamaraComponent implements OnInit {
  public cameras: MediaDeviceInfo[] = [];
  public myDevice!: MediaDeviceInfo;
  public scannerEnabled = false;
  public showScanSuccessMessage = false;
  public lastMatricula: string = " ";
  public lastNombre: string = "";
  public lastStatus: string = "";

  private hora: any = '';

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices: MediaDeviceInfo[]) => {
        this.cameras = devices.filter(
          (device: MediaDeviceInfo) => device.kind === 'videoinput'
        );
        this.myDevice = this.cameras[0];
        this.scannerEnabled = true;
      });

  }

  camerasFoundHandler(cameras: MediaDeviceInfo[]) {
    this.cameras = cameras;
    this.selectCamera(this.cameras[0].label);
  }

  scanSuccessHandler(Datos: string) {
    let obtener_Datos = Datos.split(',');
    let matricula = obtener_Datos[0];
    let nombre = obtener_Datos[1];
    let status = obtener_Datos[2];
    this.lastMatricula = matricula;
    this.lastNombre = nombre;
    this.lastStatus = status;

    const fecha = new Date();
    this.hora = fecha.getHours() + ':' + fecha.getMinutes();

    this.dataService.addScannedData(
      matricula,
      nombre,
      status,
      this.hora
    );

    this.showScanSuccessMessage = true;
    setTimeout(() => {
      this.showScanSuccessMessage = false;
    }, 2000);
    const scannerEl: any = document.querySelector('.qr-scanner');
    scannerEl.classList.add('scan');
    setTimeout(() => {
      scannerEl.classList.remove('scan');
    }, 2000);
  }

  selectCamera(cameraLabel: string) {
    this.cameras.forEach((camera) => {
      if (camera.label.includes(cameraLabel)) {
        this.myDevice = camera;
        console.log(camera.label);
        this.scannerEnabled = true;
      }
    });
  }
}
