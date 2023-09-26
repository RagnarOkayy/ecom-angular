import { Component } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  productsList: any[] = [];
  filteredProductsList: any[] = [];
  selectedCategories: number[] = [];
  categories: any[] = [];

  constructor(private productService: ProductService, private router: Router) {
    this.productService.getAllProducts().subscribe((data) => {
      this.productsList = data;
      this.filteredProductsList = data; // Initialize filteredProductsList with all products
    });

    this.productService.getAllProductCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  navigateToProductDetail(productId: number) {
    this.router.navigate(['/products', productId]);
  }

  isCategorySelected(categoryId: number): boolean {
    return this.selectedCategories.includes(categoryId);
  }

  toggleCategorySelection(categoryId: number) {
    if (this.selectedCategories.includes(categoryId)) {
      // If the category is already selected, remove it
      const index = this.selectedCategories.indexOf(categoryId);
      if (index !== -1) {
        this.selectedCategories.splice(index, 1);
      }
    } else {
      // If the category is not selected, add it
      this.selectedCategories.push(categoryId);
    }

    this.filterProducts();
  }



  filterProducts() {
    if (this.selectedCategories.length === 0) {
      // If no categories are selected, display all products
      this.filteredProductsList = this.productsList;
    } else {
      // Filter products based on selected categories
      this.filteredProductsList = this.productsList.filter((product) =>
        this.selectedCategories.includes(product.productCategoryId)
      );
    }
  }
}
