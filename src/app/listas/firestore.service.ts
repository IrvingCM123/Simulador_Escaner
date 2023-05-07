import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) { }

  async getFirestoreData() {
    const snapshot = await this.firestore.collection('3968196038/Sistemas en red/ListaAsistencia').get().toPromise();
    if (snapshot) {
      const data = snapshot.docs.map(doc => doc.data());
      console.log(snapshot)
      return data;
    } else {
      console.log("No se pudo obtener la información de Firestore.");
      return [];
    }
  }
} 
