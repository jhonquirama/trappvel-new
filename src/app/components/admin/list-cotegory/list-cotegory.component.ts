import { Component, OnInit } from "@angular/core";
import { DataApiService } from "../../../services/data-api.service";
import { CotegoryInterface } from "../../../models/cotegory";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { UserInterface } from "../../../models/user";

@Component({
  selector: "app-list-cotegory",
  templateUrl: "./list-cotegory.component.html",
  styleUrls: ["./list-cotegory.component.css"]
})
export class ListCotegoryComponent implements OnInit {
  constructor(
    private dataApi: DataApiService,
    private authService: AuthService
  ) { }
  public cotegories: CotegoryInterface[]; //TODO
  public isAdmin: any = null;
  public userEmail: string = null;

  ngOnInit() {
    this.getListCotegories();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userEmail = auth.email;
        this.authService.isUserAdmin(this.userEmail).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.rol);
          this.isAdmin= this.isAdmin.hasOwnProperty('2');
          // this.isAdmin = true;
        });
      }
    });
  }
  getListCotegories() {
    this.dataApi.getAllCotegories().subscribe(cotegories => {
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
