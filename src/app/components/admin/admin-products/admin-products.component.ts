import { Component, OnInit, OnDestroy } from '@angular/core';
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
  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;
  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAllProducts().snapshotChanges().pipe(
      map((changes: any) => changes.map((item: any) => ({key: item.key , value: item.payload.val()})))
    ).subscribe(products => this.filteredProducts = this.products = products);
  }

  filterList(query) {
    this.filteredProducts = query ? this.products.filter((product: any) => product.value.title.toLowerCase().
                                                  includes(query.toLowerCase())) : this.products;
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
