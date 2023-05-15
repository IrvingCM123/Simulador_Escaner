import { NgModule, Inject } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { CamaraComponent } from './camara/camara.component';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './menu';
import { ListasComponent } from './listas/listas.component';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { FirestoreService } from './Servicios/FirestoreListas.service';
import { ConexionService } from './Servicios/Conexion.service';
import { Datos_Locales } from './Servicios/DatosLocales.service';

@NgModule({
  declarations: [
    AppComponent,
    CamaraComponent,
    MenuComponent,
    ListasComponent,
    ConfiguracionComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    FirestoreModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ZXingScannerModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseListas),
    AngularFirestoreModule,
    CommonModule,
  ],
  providers: [FirestoreService, ConfiguracionComponent, ListasComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(@Inject(ConexionService) private conexionService: ConexionService, private datosLocales: Datos_Locales) {
    conexionService.getOnlineStatus().subscribe(online => {
      if (online) {
        this.conexionService.enviarDatos();
        this.datosLocales.eliminarDatosAlFinalizarDia();
      }
    });
  }


}
