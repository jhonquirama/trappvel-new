import { ListaUsuariosComponent } from './components/admin/lista-usuarios/lista-usuarios.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule, CanActivate } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "src/app/components/users/login/login.component";
import { ListCotegoryComponent } from "./components/admin/list-cotegory/list-cotegory.component";
import { RegisterComponent } from "src/app/components/users/register/register.component";
import { ProfileComponent } from "src/app/components/users/profile/profile.component";
import { Page404Component } from "./components/page404/page404.component";
import { AuthGuard } from "./guards/auth.guard";
import { ChatComponent } from "./components/chat/chat.component";
import { FriendsComponent } from "./components/friends/friends.component";
import { ClientsComponent } from "./components/clients/clients.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "chats",
    component: ChatComponent,
    canActivate: [AuthGuard]
  },
  { path: "admin/lista-usuarios", component: ListaUsuariosComponent, canActivate: [AuthGuard] },
  {
    path: "admin/list-cotegory",
    component: ListCotegoryComponent,
    canActivate: [AuthGuard]
  },
  { path: "user/login", component: LoginComponent },
  { path: "user/register", component: RegisterComponent },
  {
    path: "user/profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: "**", component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
