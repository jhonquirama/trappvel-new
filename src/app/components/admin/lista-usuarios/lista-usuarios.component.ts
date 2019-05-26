import { FriendsInterface } from './../../../models/friends';
import { FriendsService } from './../../../services/friends.service';
import { user } from './../../../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DataUsersService } from 'src/app/services/data-users.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  constructor(
    private dataApi: DataUsersService,
    private authService: AuthService,
    private auth: AngularFireAuth,
    private dataFriend: FriendsService
  ) { }
  public friends: FriendsInterface; //TODO

  public users: user[]; //TODO
  public isAdmin: any = null;
  public userUid: string = null;
  public photoUrl: string = null;
  public roles: string = null;

  //public providerId: string = "null";

  ngOnInit() {
    this.getListUsers();
    // this.getCurrentUser();
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
        this.userUid = auth.uid;
      //  this.photoUrl = auth.providerData[0].photoURL;

        //  console.log("si o no", this.userEmail);

        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
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
  getListUsers() {
    this.dataApi.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  onDeleteUser(userUid: string): void {
    const confirmacion = confirm("Are you sure?");
    if (confirmacion) {
      this.dataApi.deleteUser(userUid);
    }
  }

  onPreUpdateUser(user: user) {
    console.log("usuarios", user);
    this.dataApi.selectedUser = Object.assign({}, user);
  }

  onAddFriend(friend: FriendsInterface) {


    //  let user: UserInterface = {
    //   id: this.id,
    //   name: this.name,
    //  email: this.email,
    //photoUrl: this.inputImageUser.nativeElement.value
    //};
    //  this.itemsCollection.add(user);




    this.dataFriend.agregarFriend();
    console.log("amigo", friend);
  }

}