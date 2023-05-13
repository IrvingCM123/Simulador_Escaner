import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DataService } from '../Servicios/EscanearQR.service';
import { LocalStorageService } from '../Servicios/DatosLocales.service';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.css'],
})
export class CamaraComponent implements OnInit, OnChanges {
  public cameras: MediaDeviceInfo[] = [];
  public myDevice!: MediaDeviceInfo;

  public scannerEnabled = false;
  public showScanSuccessMessage = false;
  public estado_Camara = true;

  public lastMatricula: string = ' ';
  public lastNombre: string = '';
  public lastStatus: string = '';
  private hora: any = '';

  constructor(
    private dataService: DataService,
    private localStorageService: LocalStorageService
  ) {}

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

    this.localStorageService
      .obtenerCamaraObservable()
      .subscribe((valor: boolean) => {
        this.estado_Camara = valor;
        if (this.cameras.length > 0) {
          this.myDevice = this.cameras[0];
          this.scannerEnabled = valor;
        }
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['estado_Camara'] && this.cameras.length > 0) {
      this.myDevice = this.cameras[0];
      this.scannerEnabled = changes['estado_Camara'].currentValue;
    }
  }
}
