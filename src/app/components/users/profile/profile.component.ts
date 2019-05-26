import { DataUsersService } from 'src/app/services/data-users.service';
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { user } from "../../../models/user";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  constructor(private authService: AuthService, private dataApi: DataUsersService
  ) { }

  public users: user[]; //TODO
  public isAdmin: any = null;
  public userUid: string = null;
  public roles: string = null;


  user: user = {
    name: "",
    lastName: "",
    age: "",
    phoneNumber: "",
    email: "",
    photoUrl: "",

  };


  public providerId: string = "null";
  ngOnInit() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.user.photoUrl = user.photoURL;
        this.user.email = user.email;
        this.user.name = user.displayName;
        this.providerId = user.providerData[0].providerId;
      }
    });
  }


  onPreUpdateProfile(users: user) {
    //  console.log("perfiles", user);
    this.dataApi.selectedUser = Object.assign({}, users);
    console.log("perfiles", users);

  }
}
