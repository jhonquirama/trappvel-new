import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService
  ) { }
  public email: string = "";
  public password: string = "";
  public name: string = "";
  ngOnInit() { }

  onLogin(): void {
    this.authService
      .loginEmailUser(this.email, this.password)
      .then(res => {
        let valid = this.afAuth.auth.currentUser.emailVerified
        console.log(valid);
        if (valid === true) {
          this.onLoginRedirect();


        } else {
          this.router.navigate(["user/login"]);

          alert("Aun no has verificiado tu correo");
          console.log("mal", valid);

        }


      })
      .catch(err => console.log("err quiraa", err.message));
  }

  onLoginGoogle(): void {
    this.authService
      .loginGoogleUser()
      .then(res => {
        this.onLoginRedirect();
      })
      .catch(err => console.log("err", err.message));
  }
  onLoginFacebook(): void {
    this.authService
      .loginFacebookUser()
      .then(res => {
        this.onLoginRedirect();
      })
      .catch(err => console.log("err", err.message));
  }

  onLogout() {
    this.authService.logoutUser();
  }
  onLoginRedirect(): void {
    this.router.navigate(["admin/list-cotegory"]);
  }
}
