import { Injectable } from '@angular/core';
import {
  AngularFirestore, AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { FriendsInterface } from '../models/friends';
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { AuthService } from './auth.service';
import { user } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  public usuReceptor: user = {};
  public usuario: any;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.friendsCollection = this.afs.collection<FriendsInterface>("friends");

  }


  private friendsCollection: AngularFirestoreCollection<FriendsInterface>;
  private friends: Observable<FriendsInterface[]>;
  private friendDoc: AngularFirestoreDocument<FriendsInterface>;
  private friend: Observable<FriendsInterface>;
  public selectedFriend: FriendsInterface = {
  };




  //users
  getAllFriends() {
    this.friendsCollection = this.afs.collection<FriendsInterface>("friends");
    return (this.friends = this.friendsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as FriendsInterface;

          data.id = action.payload.doc.id;

          console.log("oeoeofffe", data);

          return data;
        });
      })
    ));
  }

  getOneFriend(userUid: string) {
    this.friendDoc = this.afs.doc<FriendsInterface>(`friends/${userUid}`);
    return (this.friend = this.friendDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as FriendsInterface;
          data.id = action.payload.id;
          return data;
        }
      })
    ));
  }

  addFriend(friend: FriendsInterface): void {
    this.friendsCollection.add(friend);
  }

  agregarFriend() {
    let friend: FriendsInterface = {
      userUid1: this.usuario.uid,
      userUid2: this.usuReceptor.uid,
      name1: this.usuario.name,
      name2: this.usuReceptor.name
    }
    console.log(friend);
    return this.friendsCollection.add(friend)

  }






  deleteFriend(userUid: string): void {
    this.friendDoc = this.afs.doc<FriendsInterface>(`friends/${userUid}`);
    this.friendDoc.delete();
  }

  setUsuarioReceptor(usuario: user) {
    this.usuReceptor = usuario;
  }

  getUsuarioR() {
    return this.usuReceptor;
  }
}