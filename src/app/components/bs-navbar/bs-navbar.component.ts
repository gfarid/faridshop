import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AppUser } from 'src/app/models/app-user';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ShoppingCart } from '../../models/shopping-cart';
@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  shoppingCartItemCount;
  constructor(private auth: AuthService, private router: Router ,
              private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    const cart$ = await this.shoppingCartService.getCart();
    cart$.subscribe((cart: ShoppingCart) => {
      this.shoppingCartItemCount = 0;
      for ( const productId in cart.items) {
        if (cart.items.hasOwnProperty(productId)) {
          this.shoppingCartItemCount += cart.items[productId].quantity ;
        }
      }
    });
  }

  async logout() {
   await this.auth.logout();
   this.router.navigate(['/login']);
  }

}

