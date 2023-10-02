import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CreateOrderService } from 'src/app/Services/create-order.service';
import { ProductDetailService } from 'src/app/Services/product-detail.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})


           
export class CartComponent{

  order_dict : any;
  products : any[] = [];

  userIdString = localStorage.getItem("id");
  userId = this.userIdString !== null ? parseInt(this.userIdString) : alert("User not found") // Check this later

  order: any = {
    id: 0,
    user_id: this.userId,
    productId: [],
    address: '',
    submitionDate: '',
    orderStatusType: 0,
    order_quantities: []
  }

  

  constructor(
    private route: ActivatedRoute,
    private productDetailService: ProductDetailService,
    private http: HttpClient,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  addAllProducts(){

    this.order.productId = []


    this.products.forEach((product) => {
        this.order.productId.push(product.id);
        this.order.order_quantities.push(product.quantity)
    })

    this.order.address = "Muhamed"
    this.order.submitionDate = "2023-09-28T10:25:08.527Z";
    this.order.orderStatusType = 0;
    console.log(this.order)

    this.http.post('https://localhost:7282/api/Order/postOrder', this.order).subscribe(
      (response) => {
      console.log('Order posted successfully', response);
          localStorage.removeItem(`cart${this.userId}`);
          },
          (error) => {
            console.error('Error posting order', error);
            alert("The order couldnt be completed")
          }
          );

          this.router.navigate(['/products']);

  }


  ngOnInit(): void {
    this.order_dict = this.getDict();
    this.fetchProduct()
    console.log(this.order_dict)
  }

  fetchProduct(): void {
    

    var IdValues = this.order_dict['productId']
    var quantityValues = this.order_dict['productQuantity']
    const maxLength = IdValues.length;

    for (let i=0; i < maxLength; i++){   // Use let so it captures the bloc scope
      this.productDetailService.getProduct(IdValues[i]).subscribe(
        (data) => {
          data.quantity = quantityValues[i] // Quantity gets 
          this.products.push(data); // Assuming your API returns the product data
          console.log(this.products);
        },
        (error) => {
          console.error('Error fetching product:', error);
        }
      );
    }

  }

  getDict() {

    const userId = localStorage.getItem('id');
    var dict_holder = localStorage.getItem(`cart${userId}`)
    var order_dict = {};

    if(dict_holder !== null){

      order_dict = JSON.parse(dict_holder);
      return order_dict
      console.log(order_dict)

    } else {

        return order_dict = {}

  }
  }

  
      

}
