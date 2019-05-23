import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { ModalComponent } from "./components/modal/modal.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LoginComponent } from "./components/users/login/login.component";
import { ProfileComponent } from "./components/users/profile/profile.component";
import { RegisterComponent } from "./components/users/register/register.component";
import { Page404Component } from "./components/page404/page404.component";
import { FormsModule } from "@angular/forms";
import { environment } from "../environments/environment";
import { ChatComponent } from "./components/chat/chat.component";
import { ChatService } from "./services/chat.service";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFirestore } from "@angular/fire/firestore";
import { ListCotegoryComponent } from "./components/admin/list-cotegory/list-cotegory.component";
import { FriendsComponent } from "./components/friends/friends.component";
import { ClientsComponent } from "./components/clients/clients.component";
import { ModalregisterComponent } from './components/modalregister/modalregister.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModalComponent,
    NavbarComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    Page404Component,
    ChatComponent,
    ListCotegoryComponent,
    FriendsComponent,
    ClientsComponent,
    ModalregisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [AngularFireAuth, AngularFirestore, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule {}
