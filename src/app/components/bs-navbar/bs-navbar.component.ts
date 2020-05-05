import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AppUser } from 'src/app/models/app-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent {
  appUser: AppUser;

  constructor(private auth: AuthService, private router: Router) { 
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  async logout() {
   await this.auth.logout();
   this.router.navigate(['/login']);
  }

}

