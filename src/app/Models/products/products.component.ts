import { Component } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { Router } from '@angular/router';


interface Product {
  id: number;
  name: string | null;
  description: string | null;
  price: number;
  disc_price: number;
  is_disc: boolean;
  quantity: number;
  imageData: string | null;
  ProductCategoryIds: number[];
  ProductCategoryNames: string[] | null;
}

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
      console.log(this.filteredProductsList)
    });

    this.productService.getAllProductCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  navigateToProductDetail(productId: number) {
    // Construct the URL with the product ID and navigate to it
    this.router.navigate(['/products', productId]);
  }

}
  

