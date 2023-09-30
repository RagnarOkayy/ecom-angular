import { Component, OnInit } from '@angular/core';
import { ShipmentService, ShipmentStatus } from '../../Services/shipment.service';
import { CreateOrderService } from 'src/app/Services/create-order.service';



@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  orderHistory: any[] = []

  constructor(private orderService: CreateOrderService, private shipmentService: ShipmentService){}

  ngOnInit(): void {
    
    var storedId = localStorage.getItem('id')
    var userId;
    

    if (storedId !== null) {
      userId = parseInt(storedId);

      this.orderService
        .getOrdersById(userId)
        .subscribe((data) => {
        this.orderHistory = data;        

    });

    } else {
      alert("User id not found")
    }

  }

  cancellOrder(orderid: number){
    this.shipmentService.cancellOrder(orderid)
    .subscribe((x) => {
      console.log(x)
    })
  }

  
  

}
