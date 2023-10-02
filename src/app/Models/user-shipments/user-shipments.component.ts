import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShipmentService, ShipmentStatus } from 'src/app/Services/shipment.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-shipments',
  templateUrl: './user-shipments.component.html',
  styleUrls: ['./user-shipments.component.scss']
})
export class UserShipmentsComponent implements OnInit{

  shipmentPending: any[] = [];
  shipmentShipping: any[] = [];
  shipmentShipped: any[] = [];
  shipmentCancelled: any[] = [];
  userId: any;

  constructor(private shipmentService: ShipmentService, private route: ActivatedRoute, private userService: UserService){

  }

  changeStatus(id: number, status: number){

    this.shipmentService.changeShipment(id , status)
    .subscribe((x) => {
      console.log(x)
    })
    
}

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.userId = +params['userId'];
    });

    this.shipmentService
    .getShipmentByUser(this.userId, ShipmentStatus.Pending)
    .subscribe((data) => {
      this.shipmentPending = data;
      console.log(this.shipmentPending); 
    });
    

    this.shipmentService
    .getShipmentByUser(this.userId, ShipmentStatus.Shipping)
    .subscribe((data) => {
      this.shipmentShipping = data;
      console.log(this.shipmentShipping); 
    });
    

    this.shipmentService
    .getShipmentByUser(this.userId, ShipmentStatus.Shipped)
    .subscribe((data) => {
      this.shipmentShipped = data;
      console.log(this.shipmentShipped); 
    });
    
    this.shipmentService
    .getShipmentByUser(this.userId, ShipmentStatus.Cancelled)
    .subscribe((data) => {
      this.shipmentCancelled = data;
      console.log(this.shipmentCancelled); 
    });

  }

  

}
