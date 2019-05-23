import { Injectable } from '@angular/core';
import {
  AngularFirestore, AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { UserInterface } from '../models/user';
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataUsersService {

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.usersCollection = this.afs.collection<UserInterface>("users");

  }


  private usersCollection: AngularFirestoreCollection<UserInterface>;
  private users: Observable<UserInterface[]>;
  private userDoc: AngularFirestoreDocument<UserInterface>;
  private user: Observable<UserInterface>;
  public selectedUser: UserInterface = {
    id: ""

  };




  //users
  getAllUsers() {
    this.usersCollection = this.afs.collection<UserInterface>("users");
    return (this.users = this.usersCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as UserInterface;

          data.id = action.payload.doc.id;

          // console.log("oeoeofffe", data);

          return data;
        });
      })
    ));
  }

  getOneUsers(idUser: string) {
    this.userDoc = this.afs.doc<UserInterface>(`users/${idUser}`);
    return (this.user = this.userDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as UserInterface;
          data.id = action.payload.id;
          return data;
        }
      })
    ));
  }

  addUser(user: UserInterface): void {
    this.usersCollection.add(user);
  }
  updateUser(user: UserInterface): void {
    let idUser = user.id;
    this.userDoc = this.afs.doc<UserInterface>(`user/${idUser}`);
    this.userDoc.update(user);
  }
  deleteUser(idUser: string): void {
    this.userDoc = this.afs.doc<UserInterface>(`users/${idUser}`);
    this.userDoc.delete();
  }
}