import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../Servicios/EscanearQR.service';
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

  public lastMatricula: string = ' ';
  public lastNombre: string = '';
  public lastStatus: string = '';
  private hora: any = '';

  constructor(private dataService: DataService) {}

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
    let fecha = new Date();

    this.lastMatricula = obtener_Datos[0];
    this.lastNombre = obtener_Datos[1];
    this.lastStatus = obtener_Datos[2];
    this.hora = fecha.getHours() + ':' + fecha.getMinutes();

    this.dataService.almacenarDatosQR(
      this.lastMatricula,
      this.lastNombre,
      this.lastStatus,
      this.hora
    );

    this.showScanSuccessMessage = true;
    setTimeout(() => {
      this.showScanSuccessMessage = false;
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
