import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product';

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
    this.subscription = this.productService.getAllProductsWithKeys().subscribe(products => {
      this.collectionSize = products.length;
      this.filteredProducts = this.products = products;
    });
  }

  filterList(query) {
    this.filteredProducts = query ? this.products.filter((product: any) => product.title.toLowerCase().
                                                  includes(query.toLowerCase())) : this.products;
  }

  ngOnInit(): void {
  }

sortTable(param) {
  this.reverseorder = ! this.reverseorder;
  this.products.sort((a, b) => (a[param] > b[param]) ? 1 : ((b[param] > a[param]) ? -1 : 0));
  if (this.reverseorder) {
    this.products.reverse();
  }
}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
