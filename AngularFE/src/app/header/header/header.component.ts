import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userIsAuthenticated = false;
  private authListernerSubs: Subscription;


  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authListernerSubs = 			this.authService.getAuthStatusListener()
      .subscribe(isAutheticated => {
        this.userIsAuthenticated = this.authService.getIsAuth();
      })
  }

  ngOnDestroy(): void {
    this.authListernerSubs.unsubscribe();
  }

  onLogout(){
  this.authService.logout();
}



}


