import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product';
import { take  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private  create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async  getCart() {
    const cartId = await this.getOrCreateCart();
    return this.db.object(`/shopping-carts/${cartId}`).valueChanges();
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

  async addToCart(product: Product) {
   this.updateCartQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateCartQuantity(product, -1);
  }

  private async updateCartQuantity(product , change) {
    const cartId = await this.getOrCreateCart();
    const item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe((item: any) => {
      item$.update({ product , quantity: (item && item.quantity || 0) + change });
    });
  }
}
