import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import { DataApiService } from "../../services/data-api.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"]
})
export class ModalComponent implements OnInit {
  constructor(public dataApi: DataApiService) { }
  @ViewChild("btnClose") btnClose: ElementRef;
  @Input() userUid: string;
  ngOnInit() { }

  onSaveCotegory(cotegoryForm: NgForm): void {
    if (cotegoryForm.value.id == null) {
      // New
      cotegoryForm.value.userUid = this.userUid;
      this.dataApi.addCotegory(cotegoryForm.value);
    } else {
      // Update
      this.dataApi.updateCotegory(cotegoryForm.value);
    }
    cotegoryForm.resetForm();
    this.btnClose.nativeElement.click();
  }
}
