import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories$;
  constructor(public categoryService: CategoryService) {
    this.categories$ = this.categoryService.getCategoriesWithKeys();
  }

  ngOnInit(): void {
  }

}
