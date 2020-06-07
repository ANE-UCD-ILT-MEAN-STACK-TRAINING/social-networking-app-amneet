import { BrowserModule } from '@angular/platform-browser';
import {NgModule, OnInit} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header/header.component';

import {AngularMaterialModule} from "./angular-material.module";
import {MatDialogModule} from "@angular/material/dialog";

import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./auth/auth-interceptors";
import {AuthService} from "./auth/auth.service";
import {PostsModule} from "./posts/posts.module";
import {ErrorInterceptor} from "./error-interceptor";
import { ErrorComponent } from './error/error/error.component';




@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,

    ErrorComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    PostsModule,
    MatDialogModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }

  ],

  bootstrap: [AppComponent],
  entryComponents:[ErrorComponent]
})
export class AppModule implements OnInit{

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoAuthUser();
  }
}
