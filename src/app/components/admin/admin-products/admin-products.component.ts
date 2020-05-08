import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products;
  subscription: Subscription;
  reverseorder = true;
  filteredProducts = [];

  page = 1;
  pageSize = 5;
  collectionSize = [];

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAllProducts().snapshotChanges().pipe(
      map((changes: any) => changes.map((item: any) => ({key: item.key , value: item.payload.val()})))
    ).subscribe(products => {
      this.collectionSize = products.length;
      this.filteredProducts = this.products = products;
    });
  }

  filterList(query) {
    this.filteredProducts = query ? this.products.filter((product: any) => product.value.title.toLowerCase().
                                                  includes(query.toLowerCase())) : this.products;
  }

  ngOnInit(): void {
  }


// get filteredProducts(): any[] {
//     if ( !this.products ||  !this.products.length) { return []; }
//     return this.products
//       .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
// }

sortTable(param) {
  this.reverseorder = ! this.reverseorder;
  this.products.sort((a, b) => (a.value[param] > b.value[param]) ? 1 : ((b.value[param] > a.value[param]) ? -1 : 0));
  if (this.reverseorder) {
    this.products.reverse();
  }
}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
