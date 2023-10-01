import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder,FormControl, FormGroup , Validators, } from '@angular/forms';
import { AddProductService } from 'src/app/Services/add-product.service';
import { ProductService } from 'src/app/Services/product.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown'; 
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})


export class AddProductComponent {

  productForm!: FormGroup;
  productCategories: any[] = []

  constructor(private fb: FormBuilder, private addProductService: AddProductService, private productService: ProductService) { }


  
  ngOnInit(): void {

    this.productService.getAllProductCategories().subscribe((data) => {
      this.productCategories = data;
    });

    this.productForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [, Validators.min(0)],
      disc_price: [, Validators.min(0)],
      is_disc: [false],
      quantity: [0, Validators.min(0)],
      imageData: ['', Validators.required],
      productCategoryIds: [[]]
    });
    
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.convertToBase64(file)
        .then(base64String => {
          this.productForm.patchValue({
            imageData: base64String
          });
          console.log(this.productForm.value);
          console.log(this.productCategories)
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

  onSubmit() {
    console.log(this.productForm.value.productCategoryIds)
    this.addProductService
      .postProduct(this.productForm.value)
      .subscribe((response) => {
        console.log(this.productForm.value);
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

  

  // onItemSelect(item: any) {
  //   // get the current value of productCategoryIds
  //   let productCategoryIds = this.productForm.get('productCategoryIds')?.value ?? [];
  //   // check if the item is already selected
  //   if (productCategoryIds.includes(item.id.toString())) {
  //     // if yes, remove it from the array
  //     productCategoryIds = productCategoryIds.filter((id : any) => id !== item.id.toString());
  //   } else {
  //     // if not, add it to the array as a string
  //     productCategoryIds.push(item.id.toString());
  //   }
  //   // update the value of productCategoryIds
  //   this.productForm.patchValue({ productCategoryIds: productCategoryIds });
  // }
  

}

