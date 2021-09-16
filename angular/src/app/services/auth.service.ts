import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import {User, UserCredentials} from "../common/dto.common";
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public appUser$ = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService,
  ) {
    const token = localStorage.getItem("user");
    const isExpired = this.jwtHelperService.isTokenExpired(token!);

    if (token && !isExpired) {
      this.decodeAndSetToken(token);
    }
  }

  signup(credentials: UserCredentials): void {
    this.http.post<{token: string}>(`${environment.baseApiUrl}user/signup`, credentials)
      .subscribe(({token}) => this.decodeAndSetToken(token));
  }

  signin(credentials: UserCredentials): void {
    this.http.post<{token: string}>(`${environment.baseApiUrl}user/signin`, credentials)
      .subscribe(({token}) => this.decodeAndSetToken(token));
  }

  decodeAndSetToken(token: string | null): void {
    if (!token) {
      return this.appUser$.next(null);
    }

    const {id, username} = this.jwtHelperService.decodeToken(token);
    this.appUser$.next({id, username, token});
  }
}
