import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from 'src/app/shared/models/product';
import { take  } from 'rxjs/operators';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCart();
    return this.db.object(`/shopping-carts/${cartId}`).valueChanges().pipe(
            map( (x: any) => new ShoppingCart(x.items)));
  }

  async addToCart(product: Product) {
    this.updateCartQuantity(product, 1);
   }

   async removeFromCart(product: Product) {
     this.updateCartQuantity(product, -1);
   }

   async clearCart() {
    const cartId = await this.getOrCreateCart();
    this.db.object(`/shopping-carts/${cartId}/items`).remove();
   }

  private  create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCart() {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItem(cartId, productId) {
    return this.db.object(`/shopping-carts/${cartId}/items/${productId}`);
  }

  private async updateCartQuantity(product , change) {
    const cartId = await this.getOrCreateCart();
    const item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe((item: any) => {
      const quantity = (item && item.quantity || 0) + change ;
      quantity ===  0  ? item$.remove() : item$.update({ product , quantity });
    });
  }
}
