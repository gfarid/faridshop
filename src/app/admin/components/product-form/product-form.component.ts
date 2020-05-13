import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product = {
    title:  '',
    price: null,
    imageUrl:  '',
    category: ''
  };
  urlPattern = '^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$';
  productid;
  constructor( private categoryService: CategoryService,
               private productService: ProductService,
               private router: Router,
               private route: ActivatedRoute) {
    this.productid =  this.route.snapshot.paramMap.get('id');
    if (this.productid) {
      this.productService.getProduct(this.productid).pipe(take(1)).subscribe((product: any) => this.product = product);
    }
    this.categories$ = this.categoryService.getCategoriesWithKeys();
  }

  ngOnInit(): void {
  }

  save(product) {
    if (this.productid)  {
      this.productService.updateProduct(this.productid, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  deleteProduct() {
    if (!confirm('Are you sure you want to delete this product?')) { return; }
    this.productService.deleteProduct(this.productid);
    this.router.navigate(['/admin/products']);
  }

}
