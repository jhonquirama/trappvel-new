import { Component, OnInit } from "@angular/core";
import { ChatService } from "./../../services/chat.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styles: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {
  mensaje: string = "";
  elemento: any;
  public chats: Observable<any[]>;

  constructor(public _cs: ChatService, db: AngularFirestore) {
    this.chats = db.collection("chats").valueChanges();

    this._cs.cargarMensajes().subscribe(() => {
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20);
    });
  }

  ngOnInit() {
    this.elemento = document.getElementById("app-mensajes");
  }
  enviar_mensaje() {
    console.log(this.mensaje);

    if (this.mensaje.length === 0) {
      return;
    }
    this._cs
      .agregarMensaje(this.mensaje)
      .then(() => (this.mensaje = ""))
      .catch(err => console.error("error al enviar", err));
  }
}
