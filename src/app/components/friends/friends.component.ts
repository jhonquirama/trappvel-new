import { Component, OnInit } from "@angular/core";
import { DataApiService } from "../../services/data-api.service";
import { FriendsInterface } from "../../models/friends";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { user } from "../../models/user";

@Component({
  selector: "app-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.css"]
})
export class FriendsComponent implements OnInit {
  constructor(
    private dataApi: DataApiService,
    private authService: AuthService
  ) { }
  public friends: FriendsInterface[]; //TODO
  public isAdmin: any = null;
  public userEmail: string = null;

  ngOnInit() {
    //   this.getListFriends();
    // this.getCurrentUser();
  }

  /*getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userEmail = auth.email;
        this.authService.isUserAdmin(this.userEmail).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty("admin");
          // this.isAdmin = true;
        });
      }
    });
  }
  */

  /* getListFriends() {
    this.dataApi.getAllFriends().subscribe(friends => {
      this.cotegories = cotegories;
    });
  }

  onDeleteCotegory(idCotegory: string): void {
    const confirmacion = confirm("Are you sure?");
    if (confirmacion) {
      this.dataApi.deleteCotegory(idCotegory);
    }
  }

  onPreUpdateCotegory(cotegory: CotegoryInterface) {
    console.log("cotegories", cotegory);
    this.dataApi.selectedCotegory = Object.assign({}, cotegory);
  }
}

*/
}
