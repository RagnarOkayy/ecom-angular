import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateOrderService } from 'src/app/Services/create-order.service';
import { ProductDetailService } from 'src/app/Services/product-detail.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

    product: any = {};
    imageBase64: string | undefined;
    userRole = localStorage.getItem('role')

    constructor(
      private route: ActivatedRoute,
      private productDetailService: ProductDetailService,
      private createOrderService: CreateOrderService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
          const productId = +params['id'];
          this.productDetailService.getProduct(productId).subscribe((data) => {
            this.product = data;
          });
        });
    }

    
    userIdString = localStorage.getItem("id");
    userId = this.userIdString !== null ? parseInt(this.userIdString) : alert("User not found") // Check this later
    orderQuantity: number = 1
    
    addToCart(){

      var order_dict_holder = localStorage.getItem(`cart${this.userId}`)
      var order_dict;
      
      if(order_dict_holder !== null){

        order_dict = JSON.parse(order_dict_holder);
        console.log(order_dict)

      } else {
        
          order_dict = {
          'userId' : this.userId,
          'productId': [] as number[],
          'productQuantity': [] as number[]
        }

        localStorage.setItem(`cart${this.userId}`, JSON.stringify(order_dict));
      }

      order_dict.productId.push(this.product.id)
      order_dict.productQuantity.push(this.orderQuantity)
      alert("Product Added")
      localStorage.setItem(`cart${this.userId}`, JSON.stringify(order_dict));

    }
    
    orderProduct() {
      // Create the payload for the product order

      if (this.orderQuantity <= 0 || this.orderQuantity > this.product.quantity) {
        alert("Invalid order quantity.");
        return;
      }
            const orderPayload = {
        id: 0,
        user_id: this.userId,
        productId: [this.product.id],
        address: 'string', // Replace with the actual address
        submitionDate: new Date().toISOString(),
        orderStatusType: 0,
        order_quantities: [this.orderQuantity], // You may customize this based on your needs
        total_value: [this.product.price] // You may customize this based on your needs
      };
      console.log(orderPayload)
  
      console.log(orderPayload.user_id)
      // Call the ProductService to post the product order
      this.createOrderService.postProduct(orderPayload).subscribe(
        (response) => {
          console.log('Product ordered successfully', response);
          // Handle success, e.g., show a confirmation message
        },
        (error) => {
          console.error('Error ordering product', error);
          // Handle error, e.g., show an error message
        }
      );
    }
    
  

}
