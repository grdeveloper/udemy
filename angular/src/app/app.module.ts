import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from "@auth0/angular-jwt";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({config: {
      authScheme: "Bearer ",
      tokenGetter() {return localStorage.getItem("user")},
      allowedDomains: ["localhost:8000"],
    }}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
