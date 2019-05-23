import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";
import { auth } from "firebase/app";

import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { UserInterface } from "../models/user";
import { ArgumentOutOfRangeError } from "rxjs";
import { NgForm } from "@angular/forms";
import { resolve } from 'url';
import { reject } from 'q';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private afsAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) { }


  public selectedUser: UserInterface = {};


  /* registerUser(email: string, pass: string) {
     return new Promise((resolve, reject) => {
       this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
         .then(() => {
           this.afsAuth.auth.currentUser.sendEmailVerification()
             .then(() => {
               console.log('Please verify your email');
               alert('Please verify your email');
             }).catch((error) => {
               console.log('Error: ' + error);
 
             })
         })
     })
   }
 */

  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth
        .createUserWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData), err => reject(err));
    });
  }

  verificated() {
    this.afsAuth.auth.onAuthStateChanged(user => {
      if (user) {
        let user = this.afsAuth.auth.currentUser;
        if (user != null) {
          var email = user.email;
          var emailVerificated = user.emailVerified;
          console.log("???", emailVerificated);
        }
      } else {
        alert('Estas a un paso, Por favor verifica tu correo');

      }

    })
  }

  sendVerification() {
    let user = this.afsAuth.auth.currentUser;
    user.sendEmailVerification().then(() => {
      console.log('Please verify your email');
      alert('Estas a un paso, Por favor verifica tu correo');
    }).catch((err) => {
      console.log("el de la verificacion", err.message);
    })
  }

  loginEmailUser(email: string, pass: string) {

    return new Promise((resolve, reject) => {
      this.afsAuth.auth
        .signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData), err => reject(err));


    });

  }


  loginFacebookUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  loginGoogleUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logoutUser() {
    return this.afsAuth.auth.signOut();
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  /* public updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: UserInterface = {
      id: user.uid,
      email: user.email,
      name: registerForm.value.name,
      lastName: registerForm.value.lastName,
      rol: registerForm.value.rol,
      age: registerForm.value.age,
      phoneNumber: registerForm.value.phoneNumber
    };
    console.log("los datos", data.lastName);
    return userRef.set(data, { merge: true });
  }
  */

  isUserAdmin(userEmail) {
    return this.afs.doc<UserInterface>(`users/${userEmail}`).valueChanges();
  }
}
