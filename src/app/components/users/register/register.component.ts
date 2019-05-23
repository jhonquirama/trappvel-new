import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { DataApiService } from "../../../services/data-api.service";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { Observable } from "rxjs/internal/Observable";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { UserInterface } from "../../../models/user";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(
    private dataApi: DataApiService,
    private router: Router,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private afs: AngularFirestore
  ) {
    //this.itemsCollection = this.afs.collection<UserInterface>("users");
  }
  //@ViewChild("imageUser") inputImageUser: ElementRef;


  public itemsCollection: AngularFirestoreCollection<UserInterface>;

  public email: string = "";
  public password: string = "";
  public name: string = "";

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit() { }

  /*onUpload(e) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random()
      .toString(36)
      .substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    
    this.uploadPercent = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(finalize(() => (this.urlImage = ref.getDownloadURL())))
      .subscribe();
  }*/

  /*  public onAddUser() {
    this.authService
      .registerUser(this.email, this.password)
      .then(res => {
        this.authService.isAuth().subscribe(user => {
          if (user) {
            user
              .updateProfile({
                displayName: "",
                photoURL: this.inputImageUser.nativeElement.value
              })

              .then(() => {
                //  let user: UserInterface = {
                //   id: this.id,
                //   name: this.name,
                //  email: this.email,
                //photoUrl: this.inputImageUser.nativeElement.value
                //};
                //  this.itemsCollection.add(user);

                this.router.navigate(["admin/list-cotegory"]);
              })
              .catch(error => console.log("en el register", error));
          }
        });
      })
      .catch(err => console.log("err", err.message));
  }
  */
  onLoginGoogle(): void {
    this.authService
      .loginGoogleUser()
      .then(res => {
        //  let user: UserInterface = {
        //  id: this.id,
        //  name: this.name,
        //  email: this.email,
        //   photoUrl: this.inputImageUser.nativeElement.value
        // };
        // this.itemsCollection.add(user);

        this.onLoginRedirect();
      })
      .catch(err => console.log("err", err.message));
  }
  onLoginFacebook(): void {
    this.authService
      .loginFacebookUser()
      .then(res => {
        //   let user: UserInterface = {
        //   id: this.id,
        // name: this.name,
        //email: this.email,
        //photoUrl: this.inputImageUser.nativeElement.value
        //   };
        //  this.itemsCollection.add(user);

        this.onLoginRedirect();
      })
      .catch(err => console.log("err", err.message));
  }

  onLoginRedirect(): void {
    this.router.navigate(["admin/list-cotegory"]);
  }
}
