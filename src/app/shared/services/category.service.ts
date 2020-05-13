import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
 categoryRef;
 currentCategory;
  constructor(private db: AngularFireDatabase) {
    this.categoryRef = this.db.list('/categories' , ref => ref.orderByChild('name'));
   }

  getCategories() {
    return this.db.list('/categories').valueChanges();
  }

  getCategoriesWithKeys() {
   return this.categoryRef.snapshotChanges().pipe(
      map((changes: any) => changes.map((item: any) => ({ key: item.key , ...item.payload.val()}))));
  }

  setCurrentCategory(category) {
    this.currentCategory = category;
  }

  getCurrentCategory() {
    return this.currentCategory ;
  }
}
