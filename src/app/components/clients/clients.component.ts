import { Component, OnInit } from "@angular/core";
import { UserInterface } from "../../models/user";
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
    private authService: AuthService
  ) { }
  public users: UserInterface[]; //TODO
  public isAdmin: any = null;
  public userEmail: string = null;
  public photoUrl: string = null;
  public rol: string = null;

  public providerId: string = "null";

  ngOnInit() {
    this.getListUsers();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userEmail = auth.email;
        console.log("si o no", this.userEmail);

        this.authService.isUserAdmin(this.userEmail).subscribe(userRole => {
          console.log("remedios", userRole.rol);
          this.isAdmin = Object.assign({}, userRole.rol);
          this.isAdmin = this.isAdmin.hasOwnProperty('2');
          // this.isAdmin = true;
        });
      }
    });
  }
  getListUsers() {
    this.dataApi.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  onDeleteUser(idUser: string): void {
    const confirmacion = confirm("Are you sure?");
    if (confirmacion) {
      this.dataApi.deleteUser(idUser);
    }
  }

  onPreUpdateUser(user: UserInterface) {
    console.log("usuarios", user);
    this.dataApi.selectedUser = Object.assign({}, user);
  }
}
