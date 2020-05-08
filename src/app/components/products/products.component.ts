import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  prodcuts: Product[] = [];
  filteredproducts: Product[] = [];
  category;

  constructor(private productService: ProductService , private route: ActivatedRoute) {
    this.productService.getAllProductsWithKeys().subscribe(products => {
      this.prodcuts = products;
    });

    this.route.queryParamMap.subscribe( params => {
      this.category = params.get('category');
      this.filterProductsByCategory(this.category);
    });
  }

  ngOnInit(): void {
  }

  filterProductsByCategory(category) {
    this.filteredproducts = category ? this.prodcuts.filter((prodcut: any) => prodcut.value.category === category) : this.prodcuts;
  }

}
