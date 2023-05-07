import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from './mandar.service';

interface Lista {
  Matricula: string,
  Nombre: string,
  Status: string,
}

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.css'],
})
export class CamaraComponent implements OnInit{
  public cameras: MediaDeviceInfo[] = [];
  public myDevice!: MediaDeviceInfo;
  public scannerEnabled = false;
  public results: string[] = [];
  public scannedData: string[] = [];
  public showScanSuccessMessage = false;
  public data: Lista = { Matricula: '', Nombre: '', Status: '' };


  constructor(private dataService: DataService) {}

  ngOnInit() {
    navigator.mediaDevices.enumerateDevices().then((devices: MediaDeviceInfo[]) => {
      this.cameras = devices.filter((device: MediaDeviceInfo) => device.kind === 'videoinput');
      this.myDevice = this.cameras[0];
      this.scannerEnabled = true;
    });
  }

  camerasFoundHandler(cameras: MediaDeviceInfo[]){
    this.cameras=cameras;
    this.selectCamera(this.cameras[0].label);
  }

  scanSuccessHandler(event:string){
    let obtener_Datos = event.split(',')
    this.data.Matricula = obtener_Datos[0];
    this.data.Nombre = obtener_Datos[1];
    this.data.Status = obtener_Datos[2];

    this.dataService.addScannedData(obtener_Datos[0], obtener_Datos[1], obtener_Datos[2]);
    this.results.unshift(event);
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

  selectCamera(cameraLabel: string){
    this.cameras.forEach(camera=>{
      if(camera.label.includes(cameraLabel)){
        this.myDevice=camera;
        console.log(camera.label);
        this.scannerEnabled=true;
      }
    })
  }
}
