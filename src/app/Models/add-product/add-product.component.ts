import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup , Validators } from '@angular/forms';
import { AddProductService } from 'src/app/Services/add-product.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  productForm!: FormGroup;

  constructor(private fb: FormBuilder, private addProductService: AddProductService) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [, Validators.min(0)],
      disc_price: [, Validators.min(0)],
      is_disc: [false],
      quantity: [0, Validators.min(0)],
      imageData: ['', Validators.required],
      productCategoryIds: [[3,4]]
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
    this.addProductService
      .postProduct(this.productForm.value)
      .subscribe((response) => {
        console.log(this.productForm.value);
      });
  }

}
