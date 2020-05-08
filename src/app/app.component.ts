import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private userService: UserService, private auth: AuthService, router: Router) {
    auth.user$.subscribe(user => {
        if (!user) { return; }
        userService.save(user);
        const returnUrl = localStorage.getItem('returnUrl');
        if (!returnUrl)  { return; }
        localStorage.removeItem('returnUrl');
        router.navigateByUrl(returnUrl);
    });
  }
}
