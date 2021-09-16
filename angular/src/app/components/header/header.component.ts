import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/dto.common';
import {AuthService} from "../../services/auth.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user$: BehaviorSubject<User | null> = this.authService.appUser$;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.authService.decodeAndSetToken(null);
  }

}
