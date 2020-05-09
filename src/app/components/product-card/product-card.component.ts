import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Input() showActions: boolean;
  // tslint:disable-next-line: no-input-rename
  @Input('shopping-cart') shoppingCart;


  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }

  getCartQuantity() {
    if (!this.shoppingCart) { return 0; }

    const item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0 ;
  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product);
  }
}
