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
  filteredProductsList: any[] = []
  filteredCategory: number | null = null;
  categories: any[] = [];
  

  constructor(private productService: ProductService,  private router: Router){
    
    this.productService.getAllProducts().subscribe((data) => {
      this.productsList = data;
    });

    this.productService.getAllProductCategories().subscribe((data) => {
      this.categories = data;
    })

    }

    navigateToProductDetail(productId: number) {
      this.router.navigate(['/products', productId]);
    }

    filterByCategory(categoryId: number) {
      if (this.filteredCategory === categoryId) {
        // If the clicked category is already selected, clear the filter
        this.filteredCategory = null;
        this.filteredProductsList = [];
      } else {
        // Set the filter to the selected category ID
        this.filteredCategory = categoryId;
        this.filteredProductsList = this.productsList.filter(
          (product) => product.productCategoryId === categoryId
        );
      }
    }


    // filterByCategory(category: string, isChecked: boolean) {
    //   if (isChecked) {
    //     this.categories.push(category);
    //   } else {
    //     const index = this.categories.indexOf(category);
    //     if (index !== -1) {
    //       this.categories.splice(index, 1);
    //     }
    //   }
    
    //   this.filteredProducts = this.productsList.filter((prod) =>
    //     this.categories.length === 0 || this.categories.includes(prod.productCategoryName)
    //   );
    // }

}
