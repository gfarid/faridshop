import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAllProducts() {
    return this.db.list('/products');
  }

  getAllProductsWithKeys() {
    return this.db.list('/products').snapshotChanges().pipe(
      map((changes: any) => changes.map((item: any) => ({key: item.key , value: item.payload.val()}))));
  }

  getProduct(id) {
    return this.db.object(`/products/${id}`).valueChanges();
  }

  updateProduct(id, product) {
    return this.db.object(`/products/${id}`).update(product);
  }

  deleteProduct(id) {
    //return this.db.object('/products').remove(id)

    return this.db.list('/products').remove(id);
  }
}
