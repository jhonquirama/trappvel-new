import { Component, OnInit } from "@angular/core";
import { DataApiService } from "../../services/data-api.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(private dataApi: DataApiService) {}
  public cotegories = [];
  public cotegory = "";

  ngOnInit() {
    this.dataApi.getAllCotegories().subscribe(cotegories => {
      console.log("categorias", cotegories);
      this.cotegories = cotegories;
    });
  }
}
