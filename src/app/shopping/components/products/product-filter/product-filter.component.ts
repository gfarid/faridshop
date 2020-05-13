import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  constructor(public categoryService: CategoryService) {
    this.categories$ = this.categoryService.getCategoriesWithKeys();
  }

  ngOnInit(): void {
  }

}
