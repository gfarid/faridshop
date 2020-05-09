import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { switchMap } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  prodcuts: Product[] = [];
  filteredproducts: Product[] = [];
  category;

  constructor(private productService: ProductService , private route: ActivatedRoute , private categoryService: CategoryService) {
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

  ngOnInit(): void {
  }

  filterProductsByCategory(category) {
    this.filteredproducts = category ? this.prodcuts.filter((prodcut: Product) => prodcut.category === category) : this.prodcuts;
  }

}
