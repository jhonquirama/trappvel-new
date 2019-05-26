import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { Observable } from "rxjs/internal/Observable";
import { user } from "../../models/user";
import { DataUsersService } from "src/app/services/data-users.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: "app-modalregister",
  templateUrl: "./modalregister.component.html",
  styleUrls: ["./modalregister.component.css"]
})
export class ModalregisterComponent implements OnInit {
  constructor(
    private router: Router,
    public authservice: AuthService,
    private storage: AngularFireStorage,
    private dataapi: DataUsersService,
    private afs: AngularFirestore,
    private afsAuth: AngularFireAuth
  ) { }

  @ViewChild("btnClose") btnClose: ElementRef;
  @ViewChild("imageUser") inputImageUser: ElementRef;

  @Input() photoUrl: string;


  user: user = {
    uid: '',
    name: '',
    lastName: '',
    age: '',
    phoneNumber: '',
    email: '',
    password: '',
    photoUrl: '',

  };

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  //urlUid: Observable<string>;

  public email: string = "";
  public password: string = "";
  //public photo=
  ngOnInit() { }



  onSaveRegister(registerForm: NgForm): void {
    // this.authservice.updateUserData(registerForm.value );
    this.onAddUsers(this.user);

    this.dataapi.addUser(this.user);
    registerForm.resetForm();
    this.btnClose.nativeElement.click();
  }
  /*
  onId(e){
  const id=this.afsAuth.auth.currentUser;
  this.urlUid= id.uid
  }
  */
  onUpload(e) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random()
      .toString(36)
      .substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    //   const tt= this.storage.storage.refFromURL;
    this.uploadPercent = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(finalize(() => (this.urlImage = ref.getDownloadURL())))
      .subscribe();
  }

  public onAddUsers(user: user) {
    this.authservice
      .registerUser(user.email, user.password)
      .then(() => {
        this.authservice.isAuth().subscribe(user => {
          this.authservice.sendVerification();

          if (user) {
            //this.user=user as UserInterface;
            // this.user.id = user.uid;
            //  this.dataapi.addUser(this.user);
            user
              .updateProfile({
                displayName: "",
                photoURL: this.inputImageUser.nativeElement.value
              })
              .then(() => {
                if (user.emailVerified == true) {
                  //  this.authservice.verificated();
                  this.router.navigate(["user/login"]);
                } else {
                  this.router.navigate(["user/login"])
                }
              })
              .catch(error => console.log("error", error));
          }
        });
      })
      .catch(err => console.log("err", err.message));
  }
}

/*public onAddUsers(user: UserInterface) {
    this.authservice
      .registerUser(user.email, user.password)
      .then(res => {
          this.authservice.isAuth().subscribe(user => {
          if (user) {
            //this.user=user as UserInterface;
            // this.user.id = user.uid;
          //  this.dataapi.addUser(this.user);
            user
              .updateProfile({
                displayName: '',
                photoURL: this.inputImageUser.nativeElement.value
              })
              .then(() => {

                this.router.navigate(["admin/list-cotegory"]);
              })
              .catch(error => console.log("error", error));
          }
        });
      })
      .catch(err => console.log("err", err.message));
  }
  */
