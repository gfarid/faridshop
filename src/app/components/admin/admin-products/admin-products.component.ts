import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  categories$;

  constructor( private categoryService: CategoryService, private productService: ProductService) {
    this.categories$ = this.categoryService.categoryRef.snapshotChanges().pipe(
      map((changes: any) => changes.map((item: any) => ({key: item.key , value: item.payload.val()}))));
  }

  ngOnInit(): void {
  }

  save(product){
    this.productService.create(product);
  }
}
