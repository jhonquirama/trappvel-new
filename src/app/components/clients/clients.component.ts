import { User } from 'firebase/app';
import { Component, OnInit } from "@angular/core";
import { user } from "../../models/user";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { DataUsersService } from 'src/app/services/data-users.service';

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.css"]
})
export class ClientsComponent implements OnInit {
  constructor(
    private dataApi: DataUsersService,
    private authService: AuthService,
    private auth: AngularFireAuth
  ) { }
  public users: User[]; //TODO
  public isAdmin: any = null;
  public userEmail: string = null;
  public photoUrl: string = null;
  public roles: string = null;

  //public providerId: string = "null";

  ngOnInit() {
    // this.getListUsers();
    //  this.getCurrentUser();
  }

  /*getCurrentUser() {
    let elrol = this.auth.auth.currentUser;
    this.userEmail=elrol.email;
    this.authService


  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log("tiene", auth);
        this.userEmail = auth.email;
        this.photoUrl = auth.providerData[0].photoURL;

        //  console.log("si o no", this.userEmail);

        this.authService.isUserAdmin(this.userEmail).subscribe(userRole => {
          console.log("remedios", userRole.roles);
          this.isAdmin = Object.assign({}, userRole.roles);
          this.isAdmin = this.isAdmin.hasOwnProperty('admin');
          //     console.log("algo mal", this.isAdmin);
          // this.isAdmin = true;
        });
      }
    });
  }
  */



  onDeleteUser(userEmail: string): void {
    const confirmacion = confirm("Are you sure?");
    if (confirmacion) {
      this.dataApi.deleteUser(userEmail);
    }
  }

  onPreUpdateUser(user: user) {
    console.log("usuarios", user);
    this.dataApi.selectedUser = Object.assign({}, user);
  }
}
