import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { CotegoryInterface } from "../models/cotegory";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DataApiService {
  constructor(private afs: AngularFirestore) {
    this.cotegoriesCollection = this.afs.collection<CotegoryInterface>("cotegory");
  }

  private cotegoriesCollection: AngularFirestoreCollection<CotegoryInterface>;
  private cotegories: Observable<CotegoryInterface[]>;
  private cotegoryDoc: AngularFirestoreDocument<CotegoryInterface>;
  private cotegory: Observable<CotegoryInterface>;
  public selectedCotegory: CotegoryInterface = {
    id: null
  };



  //cotegories
  getAllCotegories() {
    this.cotegoriesCollection = this.afs.collection<CotegoryInterface>(
      "cotegory"
    );
    return (this.cotegories = this.cotegoriesCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as CotegoryInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    ));
  }

  getOneCotegory(idCotegory: string) {
    this.cotegoryDoc = this.afs.doc<CotegoryInterface>(
      `cotegory/${idCotegory}`
    );
    return (this.cotegory = this.cotegoryDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as CotegoryInterface;
          data.id = action.payload.id;
          return data;
        }
      })
    ));
  }

  addCotegory(cotegory: CotegoryInterface): void {
    this.cotegoriesCollection.add(cotegory);
  }
  updateCotegory(cotegory: CotegoryInterface): void {
    let idCotegory = cotegory.id;
    this.cotegoryDoc = this.afs.doc<CotegoryInterface>(
      `cotegory/${idCotegory}`
    );
    this.cotegoryDoc.update(cotegory);
  }
  deleteCotegory(idCotegory: string): void {
    this.cotegoryDoc = this.afs.doc<CotegoryInterface>(
      `cotegory/${idCotegory}`
    );
    this.cotegoryDoc.delete();
  }


}
