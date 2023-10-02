import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ProductDetailService } from 'src/app/Services/product-detail.service';
import { ProductService } from 'src/app/Services/product.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown'; 
import { AddProductService } from 'src/app/Services/add-product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit{

  productId: any;
  product = new Product()

  productCategories: any[] = [];
  selectedProductCategories: any[] = [];

  constructor(private productDetailService : ProductDetailService,private editProductService : AddProductService, private productService : ProductService, private route: ActivatedRoute){

  }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      const productId = +params['id'];
      this.productDetailService.getProduct(productId).subscribe((data) => {
        this.product = data;
      });
    });
  
    this.productService.getAllProductCategories().subscribe((data) => {
      this.productCategories = data;
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.convertToBase64(file)
        .then(base64String => {
          this.product.imageData = base64String; // Set imageData to the base64 string
          console.log(this.product.imageData); // Log the imageData
        })
        .catch(error => {
          console.error('Error converting to base64:', error);
        });
    }
  }
  
  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event: any) => {
        var base64String = event.target.result;
        base64String = base64String.replace(/^data:image\/[a-zA-Z]+;base64,/, ''); // Remove the payload of the image

        console.log(base64String);
        resolve(base64String);
      };
  
      reader.onerror = (event: any) => {
        reject(event.target.error);
      };
  
      reader.readAsDataURL(file);
    });
  }

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'categoryName',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };  

  onSubmit() {
    // Get the IDs from selectedProductCategories and store them in productCategoryIds
    this.product.productCategoryIds = this.selectedProductCategories.map(category => category.id);
    
    this.editProductService.postProduct(this.product).subscribe((x) => {
      console.log(x)
    })
    // Now you have the selected IDs in productCategoryIds
    console.log(this.product.productCategoryIds);
    console.log(this.product.imageData);
  }

}

export class Product {
  id: any;
  name: any;
  description: any;
  price: any;
  disc_price: any;
  is_disc: any;
  quantity: any;
  imageData: any;
  productCategoryIds: any[] = [];
}
