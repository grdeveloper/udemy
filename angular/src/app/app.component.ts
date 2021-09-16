import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.authService.appUser$.subscribe(user => {
      if (user) {
        const pathname = window.location.pathname.slice(1);
        localStorage.setItem("user", user.token!);
        return this.router.navigate([
          pathname === "auth" ? "blogs" : pathname
        ]);
      }

      localStorage.removeItem("user");
      return this.router.navigate(["auth"]);
    });
  }
}
