import {CanLoad} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanLoad {
  constructor(
    private jwtHelperService: JwtHelperService,
    private authService: AuthService
  ) {}

  canLoad(): boolean {
    const token = localStorage.getItem("user");
    const isExpired = this.jwtHelperService.isTokenExpired(token!);

    if (!isExpired) {
      return true;
    }

    this.authService.decodeAndSetToken(null);
    return false;
  }
}
