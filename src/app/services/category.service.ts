import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
 categoryRef;
  constructor(private db: AngularFireDatabase) {
    this.categoryRef = this.db.list('/categories' , ref => ref.orderByChild('name'));
   }

  getCategories() {
    return this.db.list('/categories').valueChanges();
  }
}
