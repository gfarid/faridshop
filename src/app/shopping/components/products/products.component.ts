import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { switchMap } from 'rxjs/operators';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  prodcuts: Product[] = [];
  filteredproducts: Product[] = [];
  category;
  cart$: Observable<ShoppingCart>;
  subscription: Subscription;

  constructor(private productService: ProductService , private route: ActivatedRoute ,
              private categoryService: CategoryService ,  private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
   this.cart$ = await this.shoppingCartService.getCart();
   this.populateProducts();
  }

  filterProductsByCategory(category) {
    this.filteredproducts = category ? this.prodcuts.filter((prodcut: Product) => prodcut.category === category) : this.prodcuts;
  }

  populateProducts() {
    this.productService.getAllProductsWithKeys().pipe(
      switchMap(products => {
      this.prodcuts = products;
      return this.route.queryParamMap;
    }))
      .subscribe( params => {
        this.category = params.get('category');
        this.categoryService.setCurrentCategory(this.category);
        this.filterProductsByCategory(this.category);
      });
  }
}
