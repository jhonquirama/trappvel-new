import { Injectable } from '@angular/core';
import {
  AngularFirestore, AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { user } from '../models/user';
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataUsersService {

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.usersCollection = this.afs.collection<user>("users");

  }


  private usersCollection: AngularFirestoreCollection<user>;
  private users: Observable<user[]>;
  private userDoc: AngularFirestoreDocument<user>;
  private user: Observable<user>;
  public selectedUser: user = {
    uid: null,


  };




  //users
  getAllUsers() {
    this.usersCollection = this.afs.collection<user>("users");
    return (this.users = this.usersCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as user;

          data.uid = action.payload.doc.id;

          console.log("oeoeofffe", data);

          return data;
        });
      })
    ));
  }

  getOneUsers(userUid: string) {
    this.userDoc = this.afs.doc<user>(`users/${userUid}`);
    return (this.user = this.userDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as user;
          data.uid = action.payload.id;
          return data;
        }
      })
    ));
  }

  addUser(user: user): void {
    this.usersCollection.add(user);
  }
  updateUser(user: user): void {
    let userUid = user.uid;
    this.userDoc = this.afs.doc<user>(`user/${userUid}`);
    this.userDoc.update(user);
  }



  deleteUser(userUid: string): void {
    this.userDoc = this.afs.doc<user>(`users/${userUid}`);
    this.userDoc.delete();
  }
}